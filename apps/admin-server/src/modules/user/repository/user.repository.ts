// ** Typeorm Imports
import { Repository } from 'typeorm';

// ** Custom Module Imports
import CustomRepository from '../../../global/repository/typeorm-ex.decorator';

// ** Dto Imports
import User from '../domain/user.entity';
import RequestUserFindDto from '../dto/user.find.dto';
import UserStatusEnum from '../domain/user-status.enum';
import RequestDeleteUserFindDto from '../dto/user-delete.find.dto';
import { UserType } from '@/src/global/enum/UserType.enum';

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
        'teamUser.id',
        'workspaceUser.id',
      ])

      .leftJoin('user.teamUser', 'teamUser')
      .leftJoin('teamUser.workspaceUser', 'workspaceUser');

    if (dto.nickname) {
      queryBuilder.where('user.nickname like :nickname', {
        nickname: `%${dto.nickname}%`,
      });
    }

    if (dto.type) {
      queryBuilder.andWhere('user.type IN (:...type)', {
        type: typeof dto.type === 'string' ? [dto.type] : dto.type,
      });
    }

    if (dto.createdStartDate && dto.createdEndDate) {
      queryBuilder.andWhere(
        'user.createdDate between :createdStartDate and :createdEndDate',
        {
          createdStartDate: dto.createdStartDate,
          createdEndDate: `${dto.createdEndDate} 23:59:59`,
        },
      );
    }

    if (dto.lastLoginStartDate && dto.lastLoginEndDate) {
      queryBuilder.andWhere(
        'user.lastLoginDate between :lastLoginStartDate and :lastLoginEndDate',
        {
          lastLoginStartDate: dto.lastLoginStartDate,
          lastLoginEndDate: `${dto.lastLoginEndDate} 23:59:59`,
        },
      );
    }

    if (dto.page && dto.pageSize) {
      queryBuilder.skip(dto.page * dto.pageSize).take(dto.pageSize);
    }

    return await queryBuilder.getManyAndCount();
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
          createdEndDate: `${dto.createdEndDate} 23:59:59`,
        },
      );
    }

    if (dto.deletedStartDate && dto.deletedEndDate) {
      const deletedEndDate = new Date(dto.deletedEndDate);
      deletedEndDate.setHours(23, 59, 59, 999);

      queryBuilder.andWhere(
        'user.deletedDate between :deletedStartDate and :deletedEndDate',
        {
          deletedStartDate: dto.deletedStartDate,
          deletedEndDate: `${dto.deletedEndDate} 23:59:59`,
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
