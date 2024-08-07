// ** Nest Imports
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RoleEnum, UserType } from '@hi-dice/common';
import { Transactional } from 'typeorm-transactional';

// ** Custom Module Imports
import UserRepository from '../repository/user.repository';
import WorkspaceUserService from '../../workspace/service/workspace-user.service';
import WorkspaceService from '../../workspace/service/workspace.service';

// ** Utils Imports
import * as bcrypt from 'bcryptjs';
import { InjectRedis } from '@liaoliaots/nestjs-redis';
import { Redis } from 'ioredis';

// ** enum, dto, entity, types Imports
import {
  BadRequestException,
  NotFoundException,
} from '@/src/global/exception/CustomException';
import RequestUserUpdateDto from '../dto/user.update.dto';
import User from '../domain/user.entity';
import RequestSocialUserLoginDto from '../../auth/dto/user.social.login.dto';
import RequestDiceUserLoginDto from '../../auth/dto/user.dice.login.dto';
import RequestDiceUserSaveDto from '../../auth/dto/user.dice.save.dto';
import UserStatusEnum from '../domain/user-status.enum';
import RequestSocialUserSaveDto from '../../auth/dto/user.social.save.dto';
import { JwtPayload } from '@/src/global/types';

@Injectable()
export default class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly workspaceService: WorkspaceService,
    private readonly workspaceUserService: WorkspaceUserService,
    private readonly configService: ConfigService,
    @InjectRedis() private readonly redis: Redis,
  ) {}

  private logger = new Logger(UserService.name);

  /**
   * Update User
   * @param dto
   * @param user
   * @param team
   */
  public async updateUser(dto: RequestUserUpdateDto, user: User) {}

  /**
   * 소셜 타입과 토큰으로 유저를 조회합니다.
   * @param dto
   * @returns 유저
   */
  public async findUserWithWorkspaceByToken(dto: RequestSocialUserLoginDto) {
    const user = await this.userRepository.findUserWithWorkspaceByToken(
      dto.token,
      dto.type,
    );

    if (!user) {
      throw new NotFoundException('Not Found User');
    }

    return user;
  }

  /**
   *
   * @param userId
   * @returns Promise<User>
   */
  public async findOne(userId: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { userId } });

    if (!user) {
      throw new NotFoundException('Not Found User');
    }

    return user;
  }

  /**
   *
   * @param userId
   * @returns Promise<User>
   */
  public async findOneByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { email } });

    if (!user) {
      throw new NotFoundException('Not Found User');
    }

    return user;
  }

  /**
   * 이메일로 유저를 조회합니다.
   * @param dto
   * @returns 유저
   */
  public async findUserWithWorkspaceByEmail(dto: RequestDiceUserLoginDto) {
    const user = await this.userRepository.findUserWithWorkspace(dto.email);

    if (!user) {
      throw new NotFoundException('Not Found User');
    }

    return user;
  }

  /**
   * 비밀번호를 검증합니다.
   * @param user
   * @param password
   */
  public async validationPassword(user: User, password: string) {
    const result = await bcrypt.compare(password, user.password);

    if (!result) {
      throw new BadRequestException('Wrong Password');
    }
  }

  /**
   * 이메일 사용 여부를 검증합니다.
   * @param email
   */
  public async existedUserByEmail(email: string) {
    const user = await this.userRepository.exist({ where: { email } });

    if (user) {
      throw new BadRequestException('Existed User');
    }
  }

  /**
   * 토큰과 타입으로 사용자가 존재하는지 확인합니다.
   * @param token
   * @param type
   */
  public async existedUserByTokenAndType(token: string, type: UserType) {
    const user = await this.userRepository.exist({ where: { token, type } });

    if (user) {
      throw new BadRequestException('Existed User');
    }
  }

  /**
   * DICE 유저를 저장합니다.
   * @param dto
   */
  @Transactional()
  public async saveSocialUser(dto: RequestSocialUserSaveDto) {
    const user = await this.userRepository.save(
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
      await this.saveInviteWorkspace(user, dto.uuid);
    }

    const workspace = await this.workspaceService.saveInitSaveWorkspace(user);

    return {
      user,
      workspace,
    };
  }

  /**
   * DICE 유저를 저장합니다.
   * @param dto
   */
  @Transactional()
  public async saveDiceUser(dto: RequestDiceUserSaveDto) {
    const user = await this.userRepository.save(
      this.userRepository.create({
        email: dto.email,
        password: await this.generateHashPassword(dto.password),
        nickname: dto.nickname,
        type: UserType.DICE,
        fcmToken: dto.fcmToken,
        profile: this.configService.get('DEFAULT_PROFILE_VALUE'),
        lastLoginDate: new Date(),
        status: UserStatusEnum.ACTIVE,
      }),
    );

    if (dto.uuid) {
      await this.saveInviteWorkspace(user, dto.uuid);
    }

    const workspace = await this.workspaceService.saveInitSaveWorkspace(user);

    return {
      user,
      workspace,
    };
  }

  /**
   * Find User Profile By Email List
   * @param emailList
   * @returns
   */
  public async findUserProfileByEmailList(emailList: string[]) {
    return await this.userRepository.findUserProfileByEmailList(emailList);
  }

  /**
   * Find User
   * @param user
   * @returns
   */
  public async findUser(user: User) {
    const findUser = await this.userRepository.findUser(user.userId);

    if (!findUser) {
      throw new NotFoundException('Not Found User');
    }

    return findUser;
  }

  /**
   * Jwt를 기반으로 사용자를 찾습니다.
   * @param payload
   * @returns
   */
  public async findUserByPayload(payload: JwtPayload) {
    const user = await this.userRepository.findOne({
      where: { userId: payload.userId },
    });

    if (!user) {
      throw new NotFoundException('Not Found User');
    }

    return user;
  }

  /**
   * Find User By Email
   * @param email
   * @returns
   */
  public async findUserByEmail(email: string) {
    const user = await this.userRepository.findOne({ where: { email } });

    if (!user) {
      throw new NotFoundException('Not Found User');
    }

    return user;
  }

  /**
   * Update User Fcm Token
   * @param userId
   * @param fcmToken
   */
  public async updateUserFcm(userId: number, fcmToken: string) {
    await this.userRepository.update(userId, { fcmToken });
  }

  /**
   * Find User By Id
   * @param userId
   * @returns
   */
  public async findUserById(userId: number) {
    const user = await this.userRepository.findOne({ where: { userId } });

    if (!user) {
      throw new NotFoundException('Not Found User');
    }

    return user;
  }

  /**
   * 비밀번호를 암호화 합니다.
   * @param password
   * @returns 암호화 비밀번호
   */
  private async generateHashPassword(password: string) {
    return await bcrypt.hash(password, 10);
  }

  /**
   * UUID가 있을 경우 초대된 워크스페이스를 저장합니다.
   * @param user
   * @param uuid
   */
  private async saveInviteWorkspace(user: User, uuid: string) {
    const redisValue = await this.getTeamRedisValue(user.email, uuid);

    if (redisValue) {
      const workspace = await this.workspaceService.findWorkspaceByUuid(uuid);

      if (workspace) {
        const role = this.getRole(redisValue);
        const invitedId = this.getInviteId(redisValue);
        await this.workspaceUserService.saveInviteWorkspaceUser(
          workspace,
          user,
          role,
          invitedId,
        );
      }
    }
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
