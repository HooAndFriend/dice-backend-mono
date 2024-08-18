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
import Workspace from '../../workspace/domain/workspace.entity';

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
   * 유저 정보를 수정합니다.
   */
  public async updateUser(
    dto: RequestUserUpdateDto,
    user: User,
  ): Promise<void> {
    user.updateUserProfile(dto.profile, dto.nickname);
    this.userRepository.save(user);
  }

  /**
   * 소셜 타입과 토큰으로 유저를 조회합니다.
   */
  public async findUserWithWorkspaceByToken(
    dto: RequestSocialUserLoginDto,
  ): Promise<User> {
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
   * 유저를 조회합니다.
   */
  public async findOne(userId: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { userId } });

    if (!user) {
      throw new NotFoundException('Not Found User');
    }

    return user;
  }

  /**
   * 이메일로 유저를 조회합니다.
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
   */
  public async findUserWithWorkspaceByEmail(
    dto: RequestDiceUserLoginDto,
  ): Promise<User> {
    const user = await this.userRepository.findUserWithWorkspace(dto.email);

    if (!user) {
      throw new NotFoundException('Not Found User');
    }

    return user;
  }

  /**
   * 비밀번호를 검증합니다.
   */
  public async validationPassword(user: User, password: string): Promise<void> {
    const result = await bcrypt.compare(password, user.password);

    if (!result) {
      throw new BadRequestException('Wrong Password');
    }
  }

  /**
   * 이메일 사용 여부를 검증합니다.
   */
  public async existedUserByEmail(email: string): Promise<void> {
    const user = await this.userRepository.exist({ where: { email } });

    if (user) {
      throw new BadRequestException('Existed User');
    }
  }

  /**
   * 토큰과 타입으로 사용자가 존재하는지 확인합니다.
   */
  public async existedUserByTokenAndType(
    token: string,
    type: UserType,
  ): Promise<void> {
    const user = await this.userRepository.exist({ where: { token, type } });

    if (user) {
      throw new BadRequestException('Existed User');
    }
  }

  /**
   * DICE 유저를 저장합니다.
   */
  @Transactional()
  public async saveSocialUser(
    dto: RequestSocialUserSaveDto,
  ): Promise<{ user: User; workspace: Workspace }> {
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
   */
  @Transactional()
  public async saveDiceUser(
    dto: RequestDiceUserSaveDto,
  ): Promise<{ user: User; workspace: Workspace }> {
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
   * 사용자 프로필을 이메일 리스트로 찾습니다.
   */
  public async findUserProfileByEmailList(
    emailList: string[],
  ): Promise<User[]> {
    return await this.userRepository.findUserProfileByEmailList(emailList);
  }

  /**
   * 사용자를 찾습니다.
   */
  public async findUser(user: User): Promise<User> {
    const findUser = await this.userRepository.findUser(user.userId);

    if (!findUser) {
      throw new NotFoundException('Not Found User');
    }

    return findUser;
  }

  /**
   * Jwt를 기반으로 사용자를 찾습니다.
   */
  public async findUserByPayload(payload: JwtPayload): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { userId: payload.userId },
    });

    if (!user) {
      throw new NotFoundException('Not Found User');
    }

    return user;
  }

  /**
   * 이메일로 사용자를 찾습니다.
   */
  public async findUserByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { email } });

    if (!user) {
      throw new NotFoundException('Not Found User');
    }

    return user;
  }

  /**
   * 유저 FCM 정보를 수정합니다.
   */
  public async updateUserFcm(userId: number, fcmToken: string): Promise<void> {
    await this.userRepository.update(userId, { fcmToken });
  }

  /**
   * 유저를 조회합니다.
   */
  public async findUserById(userId: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { userId } });

    if (!user) {
      throw new NotFoundException('Not Found User');
    }

    return user;
  }

  /**
   * 비밀번호를 암호화 합니다.
   */
  private async generateHashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }

  /**
   * UUID가 있을 경우 초대된 워크스페이스를 저장합니다.
   */
  private async saveInviteWorkspace(user: User, uuid: string): Promise<void> {
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
   * REDIS 값으로부터 팀 정보를 가져옵니다.
   */
  private async getTeamRedisValue(
    email: string,
    uuid: string,
  ): Promise<string> {
    return await this.redis.get(`${email}&&${uuid}`);
  }

  /**
   * REDIS 값으로부터 Role을 가져옵니다.
   */
  private getRole(redisValue: string): RoleEnum {
    const role = redisValue.split('&&')[1];

    if (role === 'VIEWER') return RoleEnum.VIEWER;
    if (role === 'WRITER') return RoleEnum.WRITER;

    return RoleEnum.ADMIN;
  }

  /**
   * REDIS 값으로부터 초대된 ID를 가져옵니다.
   */
  private getInviteId(redisValue: string): string {
    return redisValue.split('&&')[2];
  }
}
