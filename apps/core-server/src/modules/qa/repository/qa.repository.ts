// ** Typeorm Imports
import { Repository } from 'typeorm';

// ** Custom Module Imports
import CustomRepository from '../../../global/repository/typeorm-ex.decorator';

// ** Dto Imports
import Qa from '../domain/qa.entity';
// ** Emum Imports
import RequestQaFindDto from '../dto/qa.find.dto';
import RequestWorkspaceTaskFindDto from '../../workspace/dto/workspace-task.find.dto';
import dayjs from 'dayjs';

@CustomRepository(Qa)
export default class QaRepository extends Repository<Qa> {
  public async findQaList(workspaceId: number, findQuery: RequestQaFindDto) {
    const queryBuilder = this.createQueryBuilder('qa')
      .select([
        'qa.id',
        'qa.code',
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
        'qaFile.id',
        'qaFile.url',
        'qa.createdDate',
        'qa.modifiedDate',
      ])
      .leftJoin('qa.admin', 'admin')
      .leftJoin('qa.worker', 'worker')
      .leftJoin('qa.qaFile', 'qaFile')
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

  public async findQaListByDate(
    workspaceId: number,
    userId: number,
    dto: RequestWorkspaceTaskFindDto,
  ) {
    const startDate = dayjs(dto.date)
      .startOf('month')
      .format('YYYY-MM-DD HH:mm:ss');

    const endDate = dayjs(dto.date)
      .endOf('month')
      .format('YYYY-MM-DD HH:mm:ss');

    const querybuilder = this.createQueryBuilder('qa')
      .select(['qa.id', 'qa.title', 'qa.dueDate', 'qa.createdDate'])
      .leftJoin('qa.workspace', 'workspace')
      .leftJoin('qa.worker', 'worker')
      .where('workspace.id = :workspaceId', { workspaceId })
      .andWhere('worker.id = :userId', { userId })
      .andWhere('qa.dueDate BETWEEN :startDate AND :endDate', {
        startDate,
        endDate,
      });

    return await querybuilder.getMany();
  }

  public async findQaById(qaId: number) {
    const queryBuilder = this.createQueryBuilder('qa')
      .select([
        'qa.id',
        'qa.code',
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
        'qaFile.id',
        'qaFile.url',
        'qa.createdDate',
        'qa.modifiedDate',
      ])
      .leftJoin('qa.admin', 'admin')
      .leftJoin('qa.worker', 'worker')
      .leftJoin('qa.qaFile', 'qaFile')
      .where('qa.id = :qaId', { qaId })
      .andWhere('qa.isDeleted = false');

    return await queryBuilder.getOne();
  }

  public async findQaListByWorkerId(workerId: number) {
    const queryBuilder = this.createQueryBuilder('qa')
      .select(['qa.id', 'qa.code', 'qa.status', 'qa.title', 'qa.createdDate'])
      .leftJoin('qa.worker', 'worker')
      .where('worker.id = :workerId', { workerId })
      .andWhere('qa.dueDate = :today', { today: dayjs().format('YYYY-MM-DD') })
      .andWhere('qa.isDeleted = false');

    return await queryBuilder.getMany();
  }
}
