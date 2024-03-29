// ** Typeorm Imports
import { Repository } from 'typeorm';

// ** Custom Module Imports
import CustomRepository from '../../../global/repository/typeorm-ex.decorator';
import Epic from '../domain/epic.entity';
import { TicketStatus } from '@/src/global/enum/ticket.enum';

@CustomRepository(Epic)
export default class EpicRepository extends Repository<Epic> {
  public async findAllEpicByWorkspaceId(workspaceId: number) {
    const querybuilder = this.createQueryBuilder('epic')
      .select([
        'epic.id',
        'epic.name',
        'epic.code',
        'workspace.id',
        'workspace.name',
        'admin.id',
        'admin.nickname',
        'admin.profile',
      ])
      .leftJoin('epic.workspace', 'workspace')
      .leftJoin('epic.admin', 'admin')
      .where('epic.workspace = :workspaceId', { workspaceId })
      .andWhere('epic.isDeleted = false');
    return await querybuilder.getManyAndCount();
  }

  public async findEpicById(epicId: number) {
    const querybuilder = this.createQueryBuilder('epic')
      .select(['epic.id', 'epic.name', 'epic.code', 'workspace.id', 'admin.id'])
      .leftJoin('epic.workspace', 'workspace')
      .leftJoin('epic.admin', 'admin')
      .where('epic.id = :epicId', { epicId })
      .andWhere('epic.isDeleted = false');
    return await querybuilder.getOne();
  }

  public async findAllByWorkspaceId(workspaceId: number) {
    const querybuilder = this.createQueryBuilder('epic')
      .select([
        'epic.id as id',
        'epic.name as name',
        'epic.code as code',
        'epic.dueDate as dueDate',
      ])
      .addSelect('COUNT(ticket.adminId)', 'allTicketCount')
      .addSelect('COUNT(CASE WHEN ticket.status = :status THEN ticket.adminId END)', 'doneTicketCount')
      .setParameter('status', TicketStatus.Compeleted)
      .leftJoin('epic.ticket', 'ticket')
      .where('epic.workspace = :workspaceId', { workspaceId })
      .where('epic.isDeleted = false')
      .groupBy('epic.id')

    return await querybuilder.getRawMany();
  }
  
  public async findOneEpicById(epicId: number) {
    const querybuilder = this.createQueryBuilder('epic')
      .select([
        'workspace.id',
        'epic.id',
        'epic.name',
        'epic.code',
        'ticket.id',
        'ticket.name',
        'ticket.dueDate',
        'ticket.endDate',
        'ticket.reopenDate',
        'ticket.status',
        'worker.id',
        'worker.profile',
        'worker.nickname',
      ])
      .leftJoin('epic.workspace', 'workspace')
      .leftJoin('epic.ticket', 'ticket')
      .leftJoin('epic.worker', 'worker')
      .where('epic.id = :epicId', { epicId })
      .andWhere('epic.isDeleted = false');
    return await querybuilder.getManyAndCount();
  }

  public async findOneByNameAndWorkspaceId(name: string, workspaceId: number) {
    const querybuilder = this.createQueryBuilder('epic')
      .select(['workspace.id', 'epic.id', 'epic.name', 'epic.code'])
      .leftJoin('epic.workspace', 'workspace')
      .leftJoin('epic.ticket', 'ticket')
      .where('epic.name = :name', { name })
      .andWhere('workspace.id = :workspaceId', { workspaceId })
      .andWhere('epic.isDeleted = false');

    return await querybuilder.getOne();
  }
}
