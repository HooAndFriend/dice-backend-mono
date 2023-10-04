// ** Nest Imports
import { HttpException, Inject, Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

// ** Custom Module Imports
import UserRepository from '../../user/repository/user.repository';
import { DataSource } from 'typeorm';

// ** Utils Imports
import * as bcrypt from 'bcryptjs';

// ** enum, dto, entity, types Imports
import { InternalServerErrorException } from '../../../exception/customException';
import { JwtPayload } from '../../../types';
import CommonResponse from '../../../common/dto/api.response';
import RequestSocialUserLoginDto from '../dto/user.social.login.dto';
import RequestSocialUserSaveDto from '../dto/user.social.save.dto';
import RequestDiceUserLoginDto from '../dto/user.dice.login.dto';
import RequestDiceUserSaveDto from '../dto/user.dice.save.dto';
import { UserType } from '../../../common/enum/UserType.enum';
import WorkspaceRepository from '../../../api/workspace/repository/workspace.repository';
import WorkspaceUserRepository from '../../../api/workspace-user/repository/workspace-user.repository';
import { WorkspaceRoleType } from '../../../common/enum/WorkspaceRoleType.enum';
import User from '../../../api/user/domain/user.entity';

@Injectable()
export default class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly workspaceRepository: WorkspaceRepository,
    private readonly workspaceUserRepository: WorkspaceUserRepository,
    // @Inject(DataSource) private readonly dataSource: DataSource,
    private readonly dataSource: DataSource,
  ) {}

  private logger = new Logger();

  public async saveSocialUser(dto: RequestSocialUserSaveDto) {
    const findUser = await this.userRepository.findOne({
      where: { token: dto.token },
    });

    if (findUser) {
      return CommonResponse.createBadRequestException(
        '이미 회원가입한 유저 입니다.',
      );
    }

    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const saveUser = await queryRunner.manager.save(
        this.userRepository.create({
          token: dto.token,
          nickname: dto.nickname,
          type: dto.type,
          comment: '',
          profile: '',
          email: '',
        }),
      );

      const saveWorkspace = await queryRunner.manager.save(
        this.workspaceRepository.create({
          name: dto.nickname,
          comment: '',
          isPersonal: true,
        }),
      );

      await queryRunner.manager.save(
        this.workspaceUserRepository.create({
          role: WorkspaceRoleType.OWNER,
          workspace: saveWorkspace,
          user: saveUser,
        }),
      );

      await queryRunner.commitTransaction();

      const token = this.generateToken({ id: saveUser.id });

      return CommonResponse.createResponse({
        statusCode: 200,
        message: '회원가입 했습니다.',
        data: {
          token,
          user: {
            nickname: saveUser.nickname,
            profile: saveUser.profile,
            email: saveUser.email,
          },
        },
      });
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
    const findUser = await this.userRepository.findOne({
      where: { token: dto.token },
    });

    if (!findUser) {
      return CommonResponse.createNotFoundException('유저를 찾을 수 없습니다.');
    }

    const token = this.generateToken({ id: findUser.id });

    return CommonResponse.createResponse({
      statusCode: 200,
      message: '로그인에 성공했습니다.',
      data: {
        token,
        user: {
          nickname: findUser.nickname,
          profile: findUser.profile,
          email: findUser.email,
        },
      },
    });
  }

  public async loginDiceUser(dto: RequestDiceUserLoginDto) {
    const findUser = await this.userRepository.findOne({
      where: { username: dto.username },
    });

    if (!findUser) {
      return CommonResponse.createNotFoundException('유저를 찾을 수 없습니다.');
    }

    const result = await bcrypt.compare(dto.password, findUser.password);

    if (!result) {
      return CommonResponse.createBadRequestException(
        '비밀번호가 맞지 않습니다.',
      );
    }

    const token = this.generateToken({ id: findUser.id });

    return CommonResponse.createResponse({
      statusCode: 200,
      message: '로그인에 성공했습니다.',
      data: {
        token,
        user: {
          nickname: findUser.nickname,
          profile: findUser.profile,
          email: findUser.email,
        },
      },
    });
  }

  public async saveDiceUser(dto: RequestDiceUserSaveDto) {
    const findUser = await this.userRepository.findOne({
      where: { username: dto.username },
    });

    if (findUser) {
      return CommonResponse.createBadRequestException(
        '이미 회원가입한 유저 입니다.',
      );
    }

    const hash = await bcrypt.hash(dto.password, 10);
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const saveUser = await queryRunner.manager.save(
        this.userRepository.create({
          username: dto.username,
          password: hash,
          nickname: dto.nickname,
          type: UserType.DICE,
          comment: '',
          profile: '',
          email: '',
        }),
      );

      const saveWorkspace = await queryRunner.manager.save(
        this.workspaceRepository.create({
          name: dto.nickname,
          comment: '',
          isPersonal: true,
        }),
      );

      await queryRunner.manager.save(
        this.workspaceUserRepository.create({
          role: WorkspaceRoleType.OWNER,
          workspace: saveWorkspace,
          user: saveUser,
        }),
      );

      await queryRunner.commitTransaction();

      const token = this.generateToken({ id: saveUser.id });

      return CommonResponse.createResponse({
        statusCode: 200,
        message: '회원가입 했습니다.',
        data: {
          token,
          user: {
            nickname: saveUser.nickname,
            profile: saveUser.profile,
            email: saveUser.email,
          },
        },
      });
    } catch (error) {
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
    return CommonResponse.createResponse({
      statusCode: 200,
      message: '토큰을 재발급합니다.',
      data: { accessToken },
    });
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
      return CommonResponse.createNotFoundException('유저를 찾을 수 없습니다.');
    }
    return findUser;
  }

  public async findRefreshToken({ id }: JwtPayload) {
    return await this.userRepository.findOne({ where: { id } });
  }
}
