// ** Typeorm Imports
import { Repository } from 'typeorm';

// ** Custom Module Imports
import CustomRepository from '../../../global/repository/typeorm-ex.decorator';

// ** Dto Imports
import Qa from '../domain/qa.entity';
// ** Emum Imports
import RequestQaFindDto from '../dto/qa.find.dto';
import { TaskStatusEnum } from '@/src/global/enum/TaskStatus.enum';

@CustomRepository(Qa)
export default class QaRepository extends Repository<Qa> {
  public async findQaList() {
    const queryBuilder = this.createQueryBuilder('qa')
      .select([
        'qa.id',
        'qa.code',
        'qa.status',
        'qa.title',
        'qa.asIs',
        'qa.toBe',
        'qa.memo',
        'qa.adminId',
        'admin.email',
        'admin.nickname',
        'admin.profile',
        'qaFile.id',
        'qaFile.url',
        'qa.createdDate',
        'qa.modifiedDate',
      ])
      .leftJoin('qa.admin', 'admin')
      .leftJoin('qa.qaFile', 'qaFile');
    return await queryBuilder.getManyAndCount();
  }

  public async findQaListByQuery(findQuery: RequestQaFindDto) {
    const queryBuilder = this.createQueryBuilder('qa')
      .select([
        'qa.id',
        'qa.code',
        'qa.status',
        'qa.title',
        'qa.asIs',
        'qa.toBe',
        'qa.memo',
        'qa.adminId',
        'admin.email',
        'admin.nickname',
        'admin.profile',
        'qaFile.id',
        'qaFile.url',
        'qa.createdDate',
        'qa.modifiedDate',
      ])
      .leftJoin('qa.admin', 'admin')
      .leftJoin('qa.qaFile', 'qaFile');

    if (findQuery.status !== TaskStatusEnum.NOTHING) {
      queryBuilder.andWhere('qa.status = :status', {
        status: findQuery.status,
      });
    }
    if (findQuery.title) {
      queryBuilder.andWhere('qa.title LIKE :title', {
        title: `%${findQuery.title}%`,
      });
    }
    if (findQuery.code) {
      queryBuilder.andWhere('qa.code LIKE :code', {
        number: `%${findQuery.code}%`,
      });
    }
    if (findQuery.createdDate) {
      queryBuilder.andWhere('qa.createdDate >= :createdDate', {
        createdDate: `${findQuery.createdDate}`,
      });
    }
    if (findQuery.modifiedDate) {
      queryBuilder.andWhere('qa.modifiedDate <= :modifiedDate', {
        modifiedDate: `${findQuery.modifiedDate}`,
      });
    }

    return await queryBuilder.getManyAndCount();
  }
}
