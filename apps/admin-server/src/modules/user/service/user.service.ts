// ** Nest Imports
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

// ** Custom Module Imports
import UserRepository from '../repository/user.repository';
import RequestUserFindDto from '../dto/user.find.dto';
import { NotFoundException } from '@/src/global/exception/CustomException';
import RequestDeleteUserFindDto from '../dto/user-delete.find.dto';

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
   * Find Delete User List
   * @param dto
   * @returns
   */
  public async findDeleteUserList(dto: RequestDeleteUserFindDto) {
    return await this.userRepository.findDeleteUserList(dto);
  }

  /**
   * Find User By Id
   * @param userId
   * @returns
   */
  public async findUserById(userId: number) {
    const user = await this.userRepository.findUser(userId);

    if (!user) {
      throw new NotFoundException('Not Found User');
    }

    return user;
  }
}
