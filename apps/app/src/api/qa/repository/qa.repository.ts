// ** Typeorm Imports
import { Repository } from 'typeorm';

// ** Custom Module Imports
import CustomRepository from '../../../repository/typeorm-ex.decorator';

// ** Dto Imports
import Qa from '../domain/qa.entity';

@CustomRepository(Qa)
export default class QaRepository extends Repository<Qa> {
  public async findQaList(workspaceId: number) {
    const queryBuilder = this.createQueryBuilder('qa')
      .select([
        'qa.id',
        'qa.number',
        'qa.status',
        'qa.title',
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
      ])
      .leftJoin('qa.admin', 'admin')
      .leftJoin('qa.worker', 'worker')
      .leftJoin('qa.file', 'file')
      .where('qa.workspaceId = :workspaceId', { workspaceId });

    return await queryBuilder.getManyAndCount();
  }
}
