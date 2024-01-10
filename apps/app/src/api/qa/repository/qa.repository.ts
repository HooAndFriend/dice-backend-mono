// ** Typeorm Imports
import { Repository } from 'typeorm';

// ** Custom Module Imports
import CustomRepository from '../../../repository/typeorm-ex.decorator';

// ** Dto Imports
import Qa from '../domain/qa.entity';
// ** Emum Imports
import { QaStatus } from '../../../common/enum/QaStatus.enum';

@CustomRepository(Qa)
export default class QaRepository extends Repository<Qa> {
  public async findQaList(workspaceId : number, status : QaStatus, title : string, qaId : string, adminNickname : string ,workerNickname : string) {
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
        'qa.createdAt',
        'qa.updatedAt',
      ])
      .leftJoin('qa.admin', 'admin')
      .leftJoin('qa.worker', 'worker')
      .leftJoin('qa.file', 'file')
      .where('qa.workspaceId = :workspaceId', { workspaceId });

      if(status !== QaStatus.ALL){
        queryBuilder.andWhere('qa.status = :status', { status });
      }
      if (title) {
        queryBuilder.andWhere('qa.title LIKE :title', { title : `%${title}%` });
      }
      if (qaId) {
        queryBuilder.andWhere('qa.id = :qaId', { qaId });
      }
      if (adminNickname) {
        queryBuilder.andWhere('admin.nickname LIKE :adminNickname', { adminNickname : `%${adminNickname}%` });
      }
      if (workerNickname) {
        queryBuilder.andWhere('worker.nickname LIKE :workerNickname', { workerNickname : `%${workerNickname}%` });
      }

    return await queryBuilder.getManyAndCount();
  }
}
