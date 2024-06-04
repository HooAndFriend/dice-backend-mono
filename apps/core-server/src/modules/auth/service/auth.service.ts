// ** Nest Imports
import { HttpException, Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UserType, RoleEnum } from '@hi-dice/common';

// ** Custom Module Imports
import UserRepository from '../../user/repository/user.repository';
import { DataSource } from 'typeorm';
import WorkspaceRepository from '../../workspace/repository/workspace.repository';
import WorkspaceUserRepository from '../../workspace/repository/workspace-user.repository';

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
} from '@hi-dice/common';
import { JwtPayload } from '../../../global/types';
import RequestSocialUserLoginDto from '../dto/user.social.login.dto';
import RequestSocialUserSaveDto from '../dto/user.social.save.dto';
import RequestDiceUserLoginDto from '../dto/user.dice.login.dto';
import RequestDiceUserSaveDto from '../dto/user.dice.save.dto';

import User from '../../user/domain/user.entity';
import UserStatusEnum from '../../user/domain/user-status.enum';
import WorkspaceFunctionRepository from '../../workspace/repository/workspace-function.repository';
import { DiceFunction } from '@hi-dice/common';
import { createCode } from '@/src/global/util/generator/code.generate';

@Injectable()
export default class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly workspaceRepository: WorkspaceRepository,
    private readonly dataSource: DataSource,
    private readonly workspaceUserRepository: WorkspaceUserRepository,
    private readonly workspaceFunctionRepository: WorkspaceFunctionRepository,
    @InjectRedis() private readonly redis: Redis,
  ) {}

  private logger = new Logger(AuthService.name);

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
          fcmToken: dto.fcmToken,
          profile: this.configService.get('DEFAULT_PROFILE_VALUE'),
          lastLoginDate: new Date(),
          status: UserStatusEnum.ACTIVE,
        }),
      );

      if (dto.uuid) {
        const redisValue = await this.getTeamRedisValue(dto.email, dto.uuid);

        if (redisValue) {
          const findWorkspace = await this.workspaceRepository.findOne({
            where: { uuid: dto.uuid },
          });

          if (findWorkspace) {
            await queryRunner.manager.save(
              this.workspaceUserRepository.create({
                user,
                workspace: findWorkspace,
                role: this.getRole(redisValue),
                invitedId: this.getInviteId(redisValue),
              }),
            );
          }
        }
      }

      const workspace = await queryRunner.manager.save(
        this.workspaceRepository.create({
          name: dto.nickname,
          profile: this.configService.get('DEFAULT_PROFILE_VALUE'),
          comment: '',
          code: createCode(dto.nickname),
          uuid: uuidv4(),
          isPersonal: true,
          createdId: user.email,
        }),
      );

      const workspaceFunctionTicket = await queryRunner.manager.save(
        this.workspaceFunctionRepository.create({
          workspace,
          function: DiceFunction.TICKET,
        }),
      );

      const workspaceFunctionQa = await queryRunner.manager.save(
        this.workspaceFunctionRepository.create({
          workspace,
          function: DiceFunction.QA,
        }),
      );

      await queryRunner.manager.save(
        this.workspaceUserRepository.create({
          workspace,
          user,
          role: RoleEnum.ADMIN,
          invitedId: user.email,
        }),
      );

      await queryRunner.commitTransaction();

      const token = this.generateToken({ id: user.userId, email: user.email });

      return {
        token,
        user,
        workspace,
        workspaceFunction: [
          {
            id: workspaceFunctionTicket.workspaceFunctionId,
            function: workspaceFunctionTicket.function,
          },
          {
            id: workspaceFunctionQa.workspaceFunctionId,
            function: workspaceFunctionQa.function,
          },
        ],
      };
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

    await this.userRepository.update(user.userId, {
      lastLoginDate: new Date(),
      fcmToken: dto.fcmToken,
    });

    const token = this.generateToken({ id: user.userId, email: user.email });

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

    await this.userRepository.update(user.userId, {
      lastLoginDate: new Date(),
      fcmToken: dto.fcmToken,
    });

    const token = this.generateToken({ id: user.userId, email: user.email });

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
          fcmToken: dto.fcmToken,
          profile: this.configService.get('DEFAULT_PROFILE_VALUE'),
          lastLoginDate: new Date(),
          status: UserStatusEnum.ACTIVE,
        }),
      );

      if (dto.uuid) {
        const redisValue = await this.getTeamRedisValue(dto.email, dto.uuid);

        if (redisValue) {
          const findWorkspace = await this.workspaceRepository.findOne({
            where: { uuid: dto.uuid },
          });

          if (findWorkspace) {
            await queryRunner.manager.save(
              this.workspaceUserRepository.create({
                user,
                workspace: findWorkspace,
                role: this.getRole(redisValue),
                invitedId: this.getInviteId(redisValue),
              }),
            );
          }
        }
      }

      const workspace = await queryRunner.manager.save(
        this.workspaceRepository.create({
          name: dto.nickname,
          profile: this.configService.get('DEFAULT_PROFILE_VALUE'),
          comment: '',
          createdId: user.email,
          code: createCode(dto.nickname),
          isPersonal: true,
          uuid: uuidv4(),
        }),
      );

      const workspaceFunctionTicket = await queryRunner.manager.save(
        this.workspaceFunctionRepository.create({
          workspace,
          function: DiceFunction.TICKET,
        }),
      );
      const workspaceFunctionQa = await queryRunner.manager.save(
        this.workspaceFunctionRepository.create({
          workspace,
          function: DiceFunction.QA,
        }),
      );

      await queryRunner.manager.save(
        this.workspaceUserRepository.create({
          workspace,
          user,
          role: RoleEnum.ADMIN,
          invitedId: user.email,
        }),
      );

      await queryRunner.commitTransaction();

      const token = this.generateToken({ id: user.userId, email: user.email });

      return {
        token,
        user,
        workspace,
        workspaceFunction: [
          {
            id: workspaceFunctionTicket.workspaceFunctionId,
            function: workspaceFunctionTicket.function,
          },
          {
            id: workspaceFunctionQa.workspaceFunctionId,
            function: workspaceFunctionQa.function,
          },
        ],
      };
    } catch (error) {
      this.logger.log(error);
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
      { id: user.userId },
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
    const findUser = await this.userRepository.findOne({
      where: { userId: id },
    });
    if (!findUser) {
      throw new NotFoundException('Not Found User');
    }
    return findUser;
  }

  public async findRefreshToken({ id }: JwtPayload) {
    return await this.userRepository.findOne({ where: { userId: id } });
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
  public async findPersonalWorkspaceAndWorkspaceList(userEmail: string) {
    return await this.workspaceRepository.findPersonalWorkspaceList(userEmail);
  }

  /**
   * Parse Redis Role
   * @param redisValue
   * @returns
   */
  private getRole(redisValue: string) {
    const role = redisValue.split('&&')[1];

    if (role === 'VIEWER') return RoleEnum.VIEWER;
    if (role === 'WRITER') return RoleEnum.WRITER;

    return RoleEnum.ADMIN;
  }

  /**
   * Parse Redis InviteId
   * @param redisValue
   * @returns
   */
  private getInviteId(redisValue: string) {
    return redisValue.split('&&')[2];
  }
}
