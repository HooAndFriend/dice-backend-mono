// ** Nest Imports
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

// ** Custom Module Imports
import UserRepository from '../repository/user.repository';
import RequestUserFindDto from '../dto/user.find.dto';
import { NotFoundException } from '@repo/common';
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
    const [data, count] = await this.userRepository.findUserList(dto);

    return [
      data.map((item) => ({
        id: item.id,
        email: item.email,
        nickname: item.nickname,
        type: item.type,
        createdDate: item.createdDate,
        lastLoginDate: item.lastLoginDate,
        teamUserCount: item.teamUser.length,
        workspaceUserCount: item.teamUser.reduce(
          (total, count) => total + count.workspaceUser.length,
          0,
        ),
      })),
      count,
    ];
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
