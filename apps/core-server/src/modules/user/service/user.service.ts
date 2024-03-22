// ** Nest Imports
import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

// ** Custom Module Imports
import UserRepository from '../repository/user.repository';

// ** Response Imports
import CommonResponse from '../../../global/dto/api.response';

// ** enum, dto, entity, types Imports
import RequestUserUpdateDto from '../dto/user.update.dto';
import User from '../domain/user.entity';

@Injectable()
export default class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly configService: ConfigService,
  ) {}

  public async updateUser(dto: RequestUserUpdateDto, user: User) {
    await this.userRepository.update(user.id, {
      nickname: dto.nickname,
      profile: dto.profile,
    });

    return CommonResponse.createResponseMessage({
      statusCode: 200,
      message: '유저의 정보를 수정합니다.',
    });
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
