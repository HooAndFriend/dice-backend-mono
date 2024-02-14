// ** Nest Imports
import { HttpException, Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

// ** Custom Module Imports
import UserRepository from '../../user/repository/user.repository';
import { DataSource } from 'typeorm';
import WorkspaceRepository from '../../workspace/repository/workspace.repository';
import TeamUserRepository from '../../team-user/repository/team-user.repository';
import TeamRepository from '../../team/repository/team.repository';
import WorkspaceUserRepository from '../../workspace-user/repository/workspace-user.repository';

// ** Utils Imports
import * as bcrypt from 'bcryptjs';
import { InjectRedis } from '@liaoliaots/nestjs-redis';
import { Redis } from 'ioredis';
import { v4 as uuidv4 } from 'uuid';

// ** enum, dto, entity, types Imports
import {
  BadRequestException,
  InternalServerErrorException,
  NotFoundException,
} from '../../../global/exception/CustomException';
import { JwtPayload } from '../../../global/types';
import RequestSocialUserLoginDto from '../dto/user.social.login.dto';
import RequestSocialUserSaveDto from '../dto/user.social.save.dto';
import RequestDiceUserLoginDto from '../dto/user.dice.login.dto';
import RequestDiceUserSaveDto from '../dto/user.dice.save.dto';
import { UserType } from '../../../global/enum/UserType.enum';
import User from '../../user/domain/user.entity';
import Role from '@/src/global/enum/Role';
import UserStatusEnum from '../../user/domain/user-status.enum';

@Injectable()
export default class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly workspaceRepository: WorkspaceRepository,
    private readonly dataSource: DataSource,
    private readonly teamUserRepository: TeamUserRepository,
    private readonly teamRepository: TeamRepository,
    private readonly workspaceUserRepository: WorkspaceUserRepository,
    @InjectRedis() private readonly redis: Redis,
  ) {}

  private logger = new Logger();

  /**
   * 소셜 회원가입
   * @param dto
   * @returns
   */
  public async saveSocialUser(dto: RequestSocialUserSaveDto) {
    const isExited = await this.userRepository.exist({
      where: {
        type: dto.type,
        token: dto.token,
      },
    });

    if (isExited) {
      throw new BadRequestException('이미 회원가입한 유저 입니다.');
    }

    const isExistedByEmaiil = await this.userRepository.exist({
      where: { email: dto.email },
    });

    if (isExistedByEmaiil) {
      throw new BadRequestException('사용 중인 이메일 입니다.');
    }
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const user = await queryRunner.manager.save(
        this.userRepository.create({
          token: dto.token,
          nickname: dto.nickname,
          email: dto.email,
          type: dto.type,
          profile: this.configService.get('DEFAULT_PROFILE_VALUE'),
          lastLoginDate: new Date(),
          status: UserStatusEnum.ACTIVE,
        }),
      );

      if (dto.uuid) {
        const redisValue = await this.getTeamRedisValue(dto.email, dto.uuid);

        if (redisValue) {
          const findTeam = await this.teamRepository.findOne({
            where: { uuid: dto.uuid },
          });

          if (findTeam) {
            await queryRunner.manager.save(
              this.teamUserRepository.create({
                team: findTeam,
                user,
                role: this.getRole(redisValue),
              }),
            );
          }
        }
      }

      const team = await queryRunner.manager.save(
        this.teamRepository.create({
          name: dto.nickname,
          profile: this.configService.get('DEFAULT_PROFILE_VALUE'),
          description: '',
          isPersonal: true,
          createdId: user.id,
          uuid: uuidv4(),
        }),
      );

      const teamUser = await queryRunner.manager.save(
        this.teamUserRepository.create({
          user,
          team,
          role: Role.ADMIN,
        }),
      );

      const workspace = await queryRunner.manager.save(
        this.workspaceRepository.create({
          name: dto.nickname,
          profile: this.configService.get('DEFAULT_PROFILE_VALUE'),
          comment: '',
          team,
          uuid: uuidv4(),
        }),
      );

      await queryRunner.manager.save(
        this.workspaceUserRepository.create({
          workspace,
          teamUser,
          role: Role.ADMIN,
        }),
      );

      await queryRunner.commitTransaction();

      const token = this.generateToken({ id: user.id });

      return { token, user, workspace, team };
    } catch (error) {
      this.logger.error(error);
      await queryRunner.rollbackTransaction();

      if (error instanceof HttpException) {
        throw new HttpException(error.message, error.getStatus());
      }

      throw new InternalServerErrorException('Internal Server Error');
    } finally {
      await queryRunner.release();
    }
  }

  public async loginSocialUser(dto: RequestSocialUserLoginDto) {
    const user = await this.userRepository.findUserWithWorkspaceByToken(
      dto.token,
      dto.type,
    );

    if (!user) {
      throw new NotFoundException('Not Found User');
    }

    await this.userRepository.update(user.id, {
      lastLoginDate: new Date(),
    });

    const token = this.generateToken({ id: user.id });

    return { token, user };
  }

  public async loginDiceUser(dto: RequestDiceUserLoginDto) {
    const user = await this.userRepository.findUserWithWorkspace(dto.email);

    if (!user) {
      throw new NotFoundException('Not Found User');
    }

    const result = await bcrypt.compare(dto.password, user.password);

    if (!result) {
      throw new BadRequestException('Wrong Password');
    }

    await this.userRepository.update(user.id, {
      lastLoginDate: new Date(),
    });

    const token = this.generateToken({ id: user.id });

    return { token, user };
  }

  /**
   * 다이스 회원가입
   * @param dto
   * @returns
   */
  public async saveDiceUser(dto: RequestDiceUserSaveDto) {
    const findUser = await this.userRepository.findOne({
      where: { email: dto.email },
    });

    if (findUser) {
      throw new BadRequestException('Existed User');
    }

    const hash = await bcrypt.hash(dto.password, 10);
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const user = await queryRunner.manager.save(
        this.userRepository.create({
          email: dto.email,
          password: hash,
          nickname: dto.nickname,
          type: UserType.DICE,
          profile: this.configService.get('DEFAULT_PROFILE_VALUE'),
          lastLoginDate: new Date(),
          status: UserStatusEnum.ACTIVE,
        }),
      );

      if (dto.uuid) {
        const redisValue = await this.getTeamRedisValue(dto.email, dto.uuid);

        if (redisValue) {
          const findTeam = await this.teamRepository.findOne({
            where: { uuid: dto.uuid },
          });

          if (findTeam) {
            await queryRunner.manager.save(
              this.teamUserRepository.create({
                team: findTeam,
                user,
                role: this.getRole(redisValue),
              }),
            );
          }
        }
      }

      const team = await queryRunner.manager.save(
        this.teamRepository.create({
          name: dto.nickname,
          profile: this.configService.get('DEFAULT_PROFILE_VALUE'),
          description: '',
          isPersonal: true,
          createdId: user.id,
          uuid: uuidv4(),
        }),
      );

      const teamUser = await queryRunner.manager.save(
        this.teamUserRepository.create({
          user,
          team,
          role: Role.ADMIN,
        }),
      );

      const workspace = await queryRunner.manager.save(
        this.workspaceRepository.create({
          name: dto.nickname,
          profile: this.configService.get('DEFAULT_PROFILE_VALUE'),
          comment: '',
          team,
          uuid: uuidv4(),
        }),
      );

      await queryRunner.manager.save(
        this.workspaceUserRepository.create({
          workspace,
          teamUser,
          role: Role.ADMIN,
        }),
      );

      await queryRunner.commitTransaction();

      const token = this.generateToken({ id: user.id });

      return { token, user, workspace, team };
    } catch (error) {
      console.log(error);
      await queryRunner.rollbackTransaction();

      if (error instanceof HttpException) {
        throw new HttpException(error.message, error.getStatus());
      }

      throw new InternalServerErrorException('Internal Server Error');
    } finally {
      await queryRunner.release();
    }
  }

  public async reissueToken(user: User) {
    const accessToken = this.jwtService.sign(
      { id: user.id },
      {
        secret: this.configService.get('JWT_ACCESS_TOKEN_SECRET'),
        expiresIn: this.configService.get('JWT_ACCESS_TOKEN_EXPIRATION_TIME'),
      },
    );

    return accessToken;
  }

  public generateToken(payload: JwtPayload): {
    accessToken: string;
    refreshToken: string;
  } {
    return {
      accessToken: this.jwtService.sign(payload, {
        secret: this.configService.get('JWT_ACCESS_TOKEN_SECRET'),
        expiresIn: this.configService.get('JWT_ACCESS_TOKEN_EXPIRATION_TIME'),
      }),
      refreshToken: this.jwtService.sign(payload, {
        secret: this.configService.get('JWT_REFRESH_TOKEN_SECRET'),
        expiresIn: this.configService.get('JWT_REFRESH_TOKEN_EXPIRATION_TIME'),
      }),
    };
  }

  public async findUserByJwt({ id }: JwtPayload): Promise<any> {
    const findUser = await this.userRepository.findOne({ where: { id } });
    if (!findUser) {
      throw new NotFoundException('Not Found User');
    }
    return findUser;
  }

  public async findRefreshToken({ id }: JwtPayload) {
    return await this.userRepository.findOne({ where: { id } });
  }

  /**
   * Get Redis Value
   * @param email
   * @param uuid
   * @returns
   */
  private async getTeamRedisValue(email: string, uuid: string) {
    return await this.redis.get(`${email}&&${uuid}`);
  }

  /**
   * Find Personal Team With Workspace List
   * @param userId
   * @returns
   */
  public async findPersonalTeamAndWorkspaceList(userId: number) {
    return await this.teamRepository.findPersonalTeamWithWorkspace(userId);
  }

  /**
   * Parse Redis Role
   * @param redisValue
   * @returns
   */
  private getRole(redisValue: string) {
    const role = redisValue.split('&&')[1];

    if (role === 'VIEWER') return Role.VIEWER;
    if (role === 'WRITER') return Role.WRITER;

    return Role.ADMIN;
  }
}
