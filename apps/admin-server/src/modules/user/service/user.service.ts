// ** Nest Imports
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

// ** Custom Module Imports
import UserRepository from '../repository/user.repository';
import RequestUserFindDto from '../dto/user.find.dto';
import { NotFoundException } from '@/src/global/exception/CustomException';

@Injectable()
export default class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly configService: ConfigService,
  ) {}

  /**
   * Find User List
   * @param dto
   * @returns
   */
  public async findUserList(dto: RequestUserFindDto) {
    return await this.userRepository.findUserList(dto);
  }

  /**
   * find User
   * @param userId
   * @returns
   */
  public async findUser(userId: number) {
    return await this.findUserById(userId);
  }

  /**
   * Find User By Id
   * @param userId
   * @returns
   */
  private async findUserById(userId: number) {
    const user = await this.userRepository.findUser(userId);
    if (!user) {
      throw new NotFoundException('Not Found User');
    }

    return user;
  }
}
