// ** Typeorm Imports
import { Repository } from 'typeorm';

// ** Custom Module Imports
import CustomRepository from '../../../global/repository/typeorm-ex.decorator';

// ** Dto Imports
import Qa from '../domain/qa.entity';
// ** Emum Imports
import RequestQaFindDto from '../dto/qa.find.dto';

@CustomRepository(Qa)
export default class QaRepository extends Repository<Qa> {
  public async findQaList(workspaceId: number, findQuery: RequestQaFindDto) {
    const queryBuilder = this.createQueryBuilder('qa')
      .select([
        'qa.id',
        'qa.number',
        'qa.status',
        'qa.title',
        'qa.dueDate',
        'qa.asIs',
        'qa.toBe',
        'qa.memo',
        'qa.adminId',
        'qa.workerId',
        'admin.email',
        'admin.nickname',
        'admin.profile',
        'worker.email',
        'worker.nickname',
        'worker.profile',
        'file.id',
        'file.url',
        'qa.createdDate',
        'qa.modifiedDate',
      ])
      .leftJoin('qa.admin', 'admin')
      .leftJoin('qa.worker', 'worker')
      .leftJoin('qa.file', 'file')
      .where('qa.workspaceId = :workspaceId', { workspaceId })
      .andWhere('qa.isDeleted = false');

    if (findQuery.status) {
      queryBuilder.andWhere('qa.status = :status', {
        status: findQuery.status,
      });
    }

    if (findQuery.title) {
      queryBuilder.andWhere('qa.title LIKE :title', {
        title: `%${findQuery.title}%`,
      });
    }

    if (findQuery.adminNickname) {
      queryBuilder.andWhere('admin.nickname LIKE :adminNickname', {
        adminNickname: `%${findQuery.adminNickname}%`,
      });
    }

    if (findQuery.workerNickname) {
      queryBuilder.andWhere('worker.nickname LIKE :workerNickname', {
        workerNickname: `%${findQuery.workerNickname}%`,
      });
    }

    return await queryBuilder.getManyAndCount();
  }

  public async findQaById(qaId: number) {
    const queryBuilder = this.createQueryBuilder('qa')
      .select([
        'qa.id',
        'qa.number',
        'qa.status',
        'qa.title',
        'qa.asIs',
        'qa.dueDate',
        'qa.toBe',
        'qa.memo',
        'qa.adminId',
        'qa.workerId',
        'admin.email',
        'admin.nickname',
        'admin.profile',
        'worker.email',
        'worker.nickname',
        'worker.profile',
        'file.id',
        'file.url',
        'qa.createdDate',
        'qa.modifiedDate',
      ])
      .leftJoin('qa.admin', 'admin')
      .leftJoin('qa.worker', 'worker')
      .leftJoin('qa.file', 'file')
      .where('qa.id = :qaId', { qaId })
      .andWhere('qa.isDeleted = false');

    return await queryBuilder.getOne();
  }
}
