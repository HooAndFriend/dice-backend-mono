// ** Typeorm Imports
import { Repository } from 'typeorm';

// ** Utils Imports
import CustomRepository from '@/src/global/repository/typeorm-ex.decorator';

// ** Dto Imports
import Epic from '../domain/epic.entity';

@CustomRepository(Epic)
export default class EpicRepository extends Repository<Epic> {
  public async findEpicList(workspaceId: number) {
    const querybuilder = this.createQueryBuilder('epic')
      .select(['epic.id', 'epic.name', 'epic.code', 'epic.orderId'])
      .where('epic.workspace = :workspaceId', { workspaceId })
      .andWhere('epic.isDeleted = false')
      .orderBy('epic.orderId', 'ASC');

    return await querybuilder.getManyAndCount();
  }

  public async findAllByWorkspaceId(workspaceId: number) {
    const querybuilder = this.createQueryBuilder('epic')
      .select([
        'epic.epicId',
        'epic.name',
        'epic.code',
        'epic.orderId',
        'ticket.ticketId',
        'ticket.name',
        'ticket.status',
        'ticket.code',
        'ticket.orderId',
        'ticket.dueDate',
        'ticket.completeDate',
        'ticket.reopenDate',
        'ticket.createdDate',
        'worker.userId',
        'worker.nickname',
        'worker.profile',
        'worker.email',
        'ticketSetting.ticketSettingId',
        'ticketSetting.name',
        'ticketSetting.type',
      ])
      .leftJoin('epic.ticket', 'ticket', 'ticket.isDeleted = false')
      .leftJoin('ticket.ticketSetting', 'ticketSetting')
      .leftJoin('ticket.worker', 'worker')
      .where('epic.workspace = :workspaceId', { workspaceId })
      .andWhere('epic.isDeleted = false')
      .orderBy('epic.orderId', 'ASC')
      .addOrderBy('ticket.orderId', 'ASC');

    return await querybuilder.getManyAndCount();
  }

  public async findOneEpicById(epicId: number) {
    const querybuilder = this.createQueryBuilder('epic')
      .select([
        'epic.epicId',
        'epic.name',
        'epic.content',
        'epic.code',
        'ticket.ticketId',
        'ticket.code',
        'ticket.name',
        'ticket.status',
        'admin.userId',
        'admin.profile',
        'admin.nickname',
      ])
      .leftJoin('epic.ticket', 'ticket')
      .leftJoin('epic.admin', 'admin')
      .where('ticket.isDeleted = false')
      .where('epic.id = :epicId', { epicId })
      .andWhere('epic.isDeleted = false')
      .orderBy('ticket.orderId', 'ASC');

    return await querybuilder.getOne();
  }

  public async findOneByNameAndWorkspaceId(name: string, workspaceId: number) {
    const querybuilder = this.createQueryBuilder('epic')
      .select([
        'workspace.workspaceId',
        'epic.epicId',
        'epic.name',
        'epic.code',
      ])
      .leftJoin('epic.workspace', 'workspace')
      .leftJoin('epic.ticket', 'ticket')
      .where('epic.name = :name', { name })
      .andWhere('workspace.id = :workspaceId', { workspaceId })
      .andWhere('epic.isDeleted = false');

    return await querybuilder.getOne();
  }
}
