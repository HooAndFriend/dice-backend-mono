// ** Typeorm Imports
import { Repository } from 'typeorm';

// ** Custom Module Imports
import CustomRepository from '../../../global/repository/typeorm-ex.decorator';

// ** Dto Imports
import Admin from '../domain/admin.entity';
import RequestAdminFindDto from '../dto/admin.find.dto';

@CustomRepository(Admin)
export default class AdminRepository extends Repository<Admin> {
  /**
   * Find Admin List
   * @param dto
   * @returns
   */
  public async findAdminList(dto: RequestAdminFindDto) {
    const queryBuilder = this.createQueryBuilder('admin').select([
      'admin.adminId',
      'admin.email',
      'admin.phone',
      'admin.nickname',
      'admin.profile',
      'admin.role',
      'admin.createdDate',
      'admin.modifiedDate',
    ]);

    if (dto.email) {
      queryBuilder.andWhere('admin.email LIKE :email', {
        email: `%${dto.email}%`,
      });
    }

    if (dto.nickname) {
      queryBuilder.andWhere('admin.nickname LIKE :nickname', {
        nickname: `%${dto.nickname}%`,
      });
    }

    if (dto.role) {
      queryBuilder.andWhere('admin.role = :role', {
        role: dto.role,
      });
    }

    if (dto.page && dto.pageSize) {
      queryBuilder.skip(dto.page * dto.pageSize).take(dto.pageSize);
    }

    return queryBuilder.orderBy('admin.createdDate', 'DESC').getManyAndCount();
  }
}
