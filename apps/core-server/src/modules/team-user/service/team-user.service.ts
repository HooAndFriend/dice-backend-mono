// ** Nest Imports
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

// ** Redis Imports
import Redis from 'ioredis';
import { InjectRedis } from '@liaoliaots/nestjs-redis';

// ** Custom Module Imports
import TeamUserRepository from '../repository/team-user.repository';
import CommonResponse from '@/src/global/dto/api.response';
import RequestTeamUserSaveDto from '../dto/team-user.save.dto';
import RequestTeamUserUpdateDto from '../dto/team-user.update.dto';
import TeamRepository from '../../team/repository/team.repository';
import Role from '@/src/global/enum/Role';
import dayjs from 'dayjs';

// ** Dto Imports
import UserRepository from '../../user/repository/user.repository';
import { BadRequestException } from '@/src/global/exception/CustomException';
import SendMailDto from '@/src/global/dto/mail-send.dto';
import Team from '../../team/domain/team.entity';
import RoleEnum from '@/src/global/enum/Role';
import User from '../../user/domain/user.entity';

@Injectable()
export default class TeamUserService {
  constructor(
    private readonly teamUserRepository: TeamUserRepository,
    private readonly teamRepository: TeamRepository,
    private readonly userRepository: UserRepository,
    @Inject('RMQ_PUSH_QUE') private readonly rmqClient: ClientProxy,
    @InjectRedis() private readonly redis: Redis,
  ) {}

  /**
   * Find Team List
   * @param userId
   * @returns
   */
  public async findTeamList(userId: number) {
    return await this.teamUserRepository.findTeamList(userId);
  }

  /**
   * Save Team User
   * @param dto
   * @returns
   */
  public async inviteTeamUser(
    team: Team,
    dto: RequestTeamUserSaveDto,
    userEmail: string,
  ) {
    const findUser = await this.findUser(dto.email);

    if (findUser) {
      await this.saveTeamUser(findUser, team, dto.role, userEmail);

      return;
    }

    await this.inviteUser(dto.email, team.uuid, dto.role, userEmail);
  }

  /**
   * Delete Team User
   * @param teamUserId
   * @returns
   */
  public async deleteTeamUser(teamUserId: number) {
    await this.teamUserRepository.delete(teamUserId);
  }

  /**
   * Update Team User Role
   * @param dto
   * @returns
   */
  public async updateTeamUserRole(dto: RequestTeamUserUpdateDto) {
    await this.teamUserRepository.update(dto.teamUserId, { role: dto.role });
  }

  /**
   *
   * @param userId
   * @returns
   */
  public async findTeamUserCount(userId: number) {
    return await this.teamUserRepository.count({
      where: { user: { id: userId } },
    });
  }

  /**
   * Find Team User List
   * @param teamId
   * @returns
   */
  public async findTeamUserList(teamId: number) {
    return await this.teamUserRepository.findTeamUserList(teamId);
  }

  /**
   * Exist Team User By Id
   * @param teamUserId
   * @returns
   */
  public async existTeamUserById(teamUserId: number) {
    const existedTeamUser = await this.teamUserRepository.exist({
      where: { id: teamUserId },
    });
    if (!existedTeamUser) {
      throw new NotFoundException('Not Found Team User');
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
   * Set Redis
   * @param email
   * @param uuid
   * @param role
   */
  private async setTeamRedis(
    email: string,
    uuid: string,
    role: Role,
    createdId: string,
  ) {
    await this.redis.set(
      `${email}&&${uuid}`,
      `${dayjs().format('YYYYMMDD')}&&${role}&&${createdId}`,
    );
  }

  /**
   * Send Mail
   * @param dto
   */
  private async sendMail(dto: SendMailDto) {
    this.rmqClient
      .send<SendMailDto>('send-single-mail', dto)
      .toPromise()
      .catch((err) => {
        console.log(err);
      });
  }

  /**
   * Find Team User By Email
   * @param email
   */
  public async isExistedTeamUserByEmail(email: string) {
    const teamUser = await this.teamUserRepository.exist({
      where: { user: { email } },
    });

    if (teamUser) {
      throw new BadRequestException('Did Invite User');
    }
  }

  /**
   * Find User By Email
   * @param email
   * @returns
   */
  private async findUser(email: string) {
    return await this.userRepository.findOne({ where: { email } });
  }

  /**
   * Save Team User
   * @param user
   * @param team
   * @param role
   */
  private async saveTeamUser(
    user: User,
    team: Team,
    role: RoleEnum,
    invitedId: string,
  ) {
    await this.teamUserRepository.save(
      this.teamUserRepository.create({
        user,
        team,
        role,
        invitedId,
      }),
    );
  }

  /**
   * Invite User
   * @param email
   * @param uuid
   * @param role
   */
  private async inviteUser(
    email: string,
    uuid: string,
    role: RoleEnum,
    createdId: string,
  ) {
    const redisValue = await this.getTeamRedisValue(email, uuid);

    if (redisValue) {
      throw new BadRequestException('Did Invite User');
    }

    const sendMail = new SendMailDto(
      email,
      '[DICE] Invite Team',
      'Invite Team',
      `<a href="http://app.hi-dice.com?uuid=${uuid}">Click</a>`,
    );

    await this.sendMail(sendMail);
    await this.setTeamRedis(email, uuid, role, createdId);
  }
}
