// ** Typeorm Imports
import { Repository } from 'typeorm';

// ** Custom Module Imports
import CustomRepository from '../../../global/repository/typeorm-ex.decorator';

// ** Dto Imports
import User from '../domain/user.entity';
import RequestUserFindDto from '../dto/user.find.dto';
import UserStatusEnum from '../domain/user-status.enum';
import RequestDeleteUserFindDto from '../dto/user-delete.find.dto';

@CustomRepository(User)
export default class UserRepository extends Repository<User> {
  /**
   * Find User List
   * @param dto
   * @returns
   */
  public async findUserList(dto: RequestUserFindDto) {
    const queryBuilder = this.createQueryBuilder('user')
      .select([
        'user.id',
        'user.email',
        'user.nickname',
        'user.type',
        'user.createdDate',
        'user.lastLoginDate',
      ])
      .addSelect('COUNT(workspaceUser.id)', 'workspaceUserCount')
      .addSelect('COUNT(teamUser.id)', 'teamUserCount')
      .leftJoin('user.teamUser', 'teamUser')
      .leftJoin('teamUser.workspaceUser', 'workspaceUser')
      .groupBy('user.id');

    if (dto.nickname) {
      queryBuilder.where('user.nickname like :nickname', {
        nickname: `%${dto.nickname}%`,
      });
    }

    if (dto.type) {
      queryBuilder.andWhere('user.type = :type', { type: dto.type });
    }

    if (dto.createdStartDate && dto.createdEndDate) {
      queryBuilder.andWhere(
        'user.createdDate between :createdStartDate and :createdEndDate',
        {
          createdStartDate: dto.createdStartDate,
          createdEndDate: dto.createdEndDate,
        },
      );
    }

    if (dto.lastLoginStartDate && dto.lastLoginEndDate) {
      queryBuilder.andWhere(
        'user.lastLoginDate between :lastLoginStartDate and :lastLoginEndDate',
        {
          lastLoginStartDate: dto.lastLoginStartDate,
          lastLoginEndDate: dto.lastLoginEndDate,
        },
      );
    }

    if (dto.page && dto.pageSize) {
      queryBuilder.skip(dto.page * dto.pageSize).take(dto.pageSize);
    }

    return await queryBuilder.getRawMany();
  }

  /**
   * Find User List
   * @param dto
   * @returns
   */
  public async findDeleteUserList(dto: RequestDeleteUserFindDto) {
    const queryBuilder = this.createQueryBuilder('user')
      .select([
        'user.id',
        'user.email',
        'user.nickname',
        'user.type',
        'user.createdDate',
        'user.deletedDate',
      ])
      .where('user.status = :status', { status: UserStatusEnum.INACTIVE });

    if (dto.nickname) {
      queryBuilder.where('user.nickname like :nickname', {
        nickname: `%${dto.nickname}%`,
      });
    }

    if (dto.type) {
      queryBuilder.andWhere('user.type = :type', { type: dto.type });
    }

    if (dto.createdStartDate && dto.createdEndDate) {
      queryBuilder.andWhere(
        'user.createdDate between :createdStartDate and :createdEndDate',
        {
          createdStartDate: dto.createdStartDate,
          createdEndDate: dto.createdEndDate,
        },
      );
    }

    if (dto.deletedStartDate && dto.deletedEndDate) {
      queryBuilder.andWhere(
        'user.deletedDate between :deletedStartDate and :deletedEndDate',
        {
          deletedStartDate: dto.deletedStartDate,
          deletedEndDate: dto.deletedEndDate,
        },
      );
    }

    if (dto.page && dto.pageSize) {
      queryBuilder.skip(dto.page * dto.pageSize).take(dto.pageSize);
    }

    return await queryBuilder.getManyAndCount();
  }

  /**
   * Find User By Id
   * @param id
   * @returns
   */
  public async findUser(id: number) {
    const queryBuilder = this.createQueryBuilder('user')
      .select([
        'user.id',
        'user.email',
        'user.nickname',
        'user.createdDate',
        'user.lastLoginDate',
        'user.deleted_date',
        'user.deleted_reason',
        'user.type',
      ])
      .where('user.id = :id', { id });

    return queryBuilder.getOne();
  }
}
