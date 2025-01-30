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
      .select([
        'epic.epicId',
        'epic.name',
        'epic.code',
        'epic.orderId',
        'epicSetting.ticketSettingId',
        'epicSetting.name',
        'epicSetting.type',
      ])
      .leftJoin('epic.ticketSetting', 'epicSetting')
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
        'epicSetting.ticketSettingId',
        'epicSetting.name',
        'epicSetting.type',
        'ticket.ticketId',
        'ticket.name',
        'ticket.priority',
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
      .leftJoin('epic.ticketSetting', 'epicSetting')
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
        'ticket.ticketId',
        'ticket.name',
        'ticket.status',
        'ticket.content',
        'ticket.code',
        'ticket.storypoint',
        'ticket.dueDate',
        'ticket.completeDate',
        'ticket.reopenDate',
        'ticket.createdDate',
        'ticket.modifiedDate',
        'admin.userId',
        'admin.email',
        'admin.nickname',
        'admin.profile',
        'worker.userId',
        'worker.email',
        'worker.nickname',
        'worker.profile',
        'ticketSetting.ticketSettingId',
        'ticketSetting.name',
        'ticketSetting.type',
      ])
      .leftJoin('epic.ticket', 'ticket')
      .leftJoin('ticket.admin', 'admin')
      .leftJoin('ticket.worker', 'worker')
      .leftJoin('ticket.ticketSetting', 'ticketSetting')
      .where('ticket.isDeleted = false')
      .andWhere('epic.epicId = :epicId', { epicId })
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
      .andWhere('workspace.workspaceId = :workspaceId', { workspaceId })
      .andWhere('epic.isDeleted = false');

    return await querybuilder.getOne();
  }
}
