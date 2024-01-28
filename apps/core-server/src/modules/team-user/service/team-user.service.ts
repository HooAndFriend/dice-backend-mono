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
import { MailService } from '@/src/global/util/mail/mail.service';

// ** Dto Imports
import SendMailDto from '@/src/global/util/mail/mail.send.dto';
import UserRepository from '../../user/repository/user.repository';
import { BadRequestException } from '@/src/global/exception/CustomException';

@Injectable()
export default class TeamUserService {
  constructor(
    private readonly teamUserRepository: TeamUserRepository,
    private readonly teamRepository: TeamRepository,
    private readonly mailService: MailService,
    private readonly userRepository: UserRepository,
    @Inject('RMQ_SERVICE') private readonly rmqClient: ClientProxy,
    @InjectRedis() private readonly redis: Redis,
  ) {}

  /**
   * Find Team List
   * @param userId
   * @returns
   */
  public async findTeamList(userId: number) {
    const [data, count] = await this.teamUserRepository.findTeamList(userId);

    return CommonResponse.createResponse({
      statusCode: 200,
      message: 'Find User Team List',
      data: { data, count },
    });
  }

  /**
   * Save Team User
   * @param dto
   * @returns
   */
  public async saveTeamUser(dto: RequestTeamUserSaveDto) {
    const team = await this.teamRepository.findOne({
      where: { id: dto.teamId },
    });

    if (!team) {
      throw new NotFoundException('Not Found Team');
    }

    const findTeamUser = await this.teamUserRepository.exist({
      where: { user: { email: dto.email } },
    });

    if (findTeamUser) {
      throw new BadRequestException('Did Invite User');
    }

    const findUser = await this.userRepository.findOne({
      where: { email: dto.email },
    });

    if (findUser) {
      await this.teamUserRepository.save(
        this.teamUserRepository.create({
          user: findUser,
          team,
          role: dto.role,
        }),
      );
    }

    if (!findUser) {
      const redisValue = await this.getTeamRedisValue(dto.email, team.uuid);

      if (redisValue) {
        throw new BadRequestException('Did Invite User');
      }

      const sendMail = new SendMailDto(
        dto.email,
        '[DICE] Invite Team',
        'Invite Team',
        `<a href="http://hi-dice.com?uuid=${team.uuid}">Click</a>`,
      );

      await this.mailService.sendMail(sendMail);
      await this.setTeamRedis(dto.email, team.uuid, dto.role);
    }
    return CommonResponse.createResponseMessage({
      statusCode: 200,
      message: 'Invite User',
    });
  }

  /**
   * Delete Team User
   * @param teamUserId
   * @returns
   */
  public async deleteTeamUser(teamUserId: number) {
    const isExistTeamUser = await this.existTeamUserById(teamUserId);

    if (!isExistTeamUser) {
      throw new NotFoundException('Not Found Team User');
    }

    await this.teamUserRepository.delete(teamUserId);

    return CommonResponse.createResponseMessage({
      statusCode: 200,
      message: 'Delete Team User',
    });
  }

  /**
   * Update Team User Role
   * @param dto
   * @returns
   */
  public async updateTeamUserRole(dto: RequestTeamUserUpdateDto) {
    const isExistTeamUser = await this.existTeamUserById(dto.teamUserId);

    if (!isExistTeamUser) {
      throw new NotFoundException('Not Found Team User');
    }

    await this.teamUserRepository.update(dto.teamUserId, { role: dto.role });

    return CommonResponse.createResponseMessage({
      statusCode: 200,
      message: 'Update Team User Role',
    });
  }

  /**
   * Find Team User List
   * @param teamId
   * @returns
   */
  public async findTeamUserList(teamId: number) {
    const [data, count] = await this.teamUserRepository.findTeamUserList(
      teamId,
    );

    return CommonResponse.createResponse({
      statusCode: 200,
      message: 'Find Team User List',
      data: { data, count },
    });
  }

  /**
   * Exist Team User By Id
   * @param teamUserId
   * @returns
   */
  private async existTeamUserById(teamUserId: number) {
    return await this.teamUserRepository.exist({ where: { id: teamUserId } });
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
  private async setTeamRedis(email: string, uuid: string, role: Role) {
    await this.redis.set(
      `${email}&&${uuid}`,
      `${dayjs().format('YYYYMMDD')}&&${role}`,
    );
  }

  /**
   * Send Mail
   * @param dto
   */
  private async sendMail(dto: SendMailDto) {
    this.rmqClient
      .send<SendMailDto>({ cmd: 'send-single-mail' }, dto)
      .toPromise()
      .catch((err) => {
        console.log(err);
      });
  }
}
