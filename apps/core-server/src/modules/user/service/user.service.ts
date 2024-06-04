// ** Nest Imports
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';
import { NotFoundException } from '@hi-dice/common';

// ** Custom Module Imports
import UserRepository from '../repository/user.repository';

// ** enum, dto, entity, types Imports
import RequestUserUpdateDto from '../dto/user.update.dto';
import User from '../domain/user.entity';

@Injectable()
export default class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly configService: ConfigService,
    private readonly dataSource: DataSource,
  ) {}

  private logger = new Logger(UserService.name);

  /**
   * Update User
   * @param dto
   * @param user
   * @param team
   */
  public async updateUser(dto: RequestUserUpdateDto, user: User) {
    // const queryRunner = this.dataSource.createQueryRunner();
    // await queryRunner.connect();
    // await queryRunner.startTransaction();
    // try {
    //   await queryRunner.commitTransaction();
    //   const workspace = team.workspace.filter(
    //     (item) => item.name === user.nickname,
    //   );
    //   if (workspace.length > 0) {
    //     const personalWorksapce = workspace[0];
    //     personalWorksapce.name = dto.nickname;
    //     personalWorksapce.profile = dto.profile;
    //     await queryRunner.manager.save(personalWorksapce);
    //   }
    //   user.updateUserProfile(dto.profile, dto.nickname);
    //   team.updateTeamProfile(dto.profile, dto.nickname);
    //   await queryRunner.manager.save(user);
    //   await queryRunner.manager.save(team);
    // } catch (error) {
    //   this.logger.error(error);
    //   await queryRunner.rollbackTransaction();
    //   if (error instanceof HttpException) {
    //     throw new HttpException(error.message, error.getStatus());
    //   }
    //   throw new InternalServerErrorException('Internal Server Error');
    // } finally {
    //   await queryRunner.release();
    // }
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
}
