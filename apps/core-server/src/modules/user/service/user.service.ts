// ** Nest Imports
import {
  HttpException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';

// ** Custom Module Imports
import UserRepository from '../repository/user.repository';

// ** Response Imports
import CommonResponse from '../../../global/dto/api.response';

// ** enum, dto, entity, types Imports
import RequestUserUpdateDto from '../dto/user.update.dto';
import User from '../domain/user.entity';
import Team from '../../team/domain/team.entity';

@Injectable()
export default class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly configService: ConfigService,
    private readonly dataSource: DataSource,
  ) {}

  private logger = new Logger(UserService.name);

  public async updateUser(dto: RequestUserUpdateDto, user: User, team: Team) {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      await queryRunner.commitTransaction();

      const workspace = team.workspace.filter(
        (item) => item.name === user.nickname,
      );

      if (workspace.length > 0) {
        const personalWorksapce = workspace[0];
        personalWorksapce.name = dto.nickname;
        personalWorksapce.profile = dto.profile;
        await queryRunner.manager.save(personalWorksapce);
      }

      user.updateUserProfile(dto.profile, dto.nickname);
      team.updateTeamProfile(dto.profile, dto.nickname);

      await queryRunner.manager.save(user);
      await queryRunner.manager.save(team);
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

  public async findUser(user: User) {
    const findUser = await this.userRepository.findUser(user.id);

    if (!findUser) {
      throw new NotFoundException('Not Found User');
    }

    return CommonResponse.createResponse({
      statusCode: 200,
      message: '유저 정보를 조회합니다.',
      data: findUser,
    });
  }

  /**
   * Find User By Id
   * @param userId
   * @returns
   */
  public async findUserById(userId: number) {
    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (!user) {
      throw new NotFoundException('Not Found User');
    }

    return user;
  }
}
