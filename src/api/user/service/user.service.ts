// ** Nest Imports
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

// ** enum, dto, entity, types Imports

// ** Custom Module Imports
import UserRepository from '../repository/user.repository';
import RequestUserUpdateDto from '../dto/user.update.dto';
import User from '../domain/user.entity';
import CommonResponse from 'src/common/dto/api.response';

// Other Imports

@Injectable()
export default class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly configService: ConfigService,
  ) {}

  public async updateUser(dto: RequestUserUpdateDto, user: User) {
    const findUser = await this.userRepository.findOne({
      where: { email: dto.email },
    });

    if (findUser) {
      return CommonResponse.createBadRequestException(
        '이미 사용 중인 이메일 입니다.',
      );
    }

    await this.userRepository.update(user.id, {
      nickname: dto.nickname,
      email: dto.email,
      profile: dto.profile,
      comment: dto.comment,
    });

    return CommonResponse.createResponseMessage({
      statusCode: 200,
      message: '유저의 정보를 수정합니다.',
    });
  }

  public async findUser(user: User) {
    const findUser = await this.userRepository.findUser(user.id);

    if (!findUser) {
      return CommonResponse.createNotFoundException(
        '유저 정보를 찾을 수 없습니다.',
      );
    }

    return CommonResponse.createResponse({
      statusCode: 200,
      message: '유저 정보를 조회합니다.',
      data: findUser,
    });
  }
}
