// ** Typeorm Imports
import { Repository } from 'typeorm';

// ** Custom Module Imports
import CustomRepository from '../../../global/repository/typeorm-ex.decorator';
import Ticket from '../domain/ticket.entity';

@CustomRepository(Ticket)
export default class TicketRepository extends Repository<Ticket> {
  public async findTicketById(ticketId: number) {
    const querybuilder = this.createQueryBuilder('ticket')
      .select([
        'ticket.id',
        'ticket.name',
        'ticket.status',
        'ticket.content',
        'ticket.number',
        'ticket.storypoint',
        'ticket.dueDate',
        'ticket.completeDate',
        'ticket.reopenDate',
        'workspace.id',
        'epic.id',
        'admin.id',
        'admin.nickname',
        'admin.profile',
        'worker.id',
        'worker.nickname',
        'worker.profile',
      ])
      .leftJoin('ticket.workspace', 'workspace')
      .leftJoin('ticket.epic', 'epic')
      .leftJoin('ticket.admin', 'admin')
      .leftJoin('ticket.worker', 'worker')
      .where('ticket.id = :ticketId', { ticketId })
      .andWhere('ticket.isDeleted = false');
    return await querybuilder.getOne();
  }

  public async findAllTicketByEpicId(epicId: number) {
    const querybuilder = this.createQueryBuilder('ticket')
      .select([
        'ticket.id',
        'ticket.name',
        'ticket.status',
        'ticket.dueDate',
        'ticket.number',
        'ticket.completeDate',
        'ticket.reopenDate',
        'worker.id',
        'worker.profile',
        'epic.id',
      ])
      .leftJoin('ticket.worker', 'worker')
      .leftJoin('ticket.epic', 'epic')
      .where('ticket.epic = :epicId', { epicId })
      .andWhere('ticket.isDeleted = false');
    return await querybuilder.getManyAndCount();
  }

  public async findAllTicketByWorkspaceId(workspaceId: number) {
    const querybuilder = this.createQueryBuilder('ticket')
      .select([
        'ticket.id',
        'ticket.name',
        'ticket.status',
        'ticket.number',
        'ticket.dueDate',
        'ticket.completeDate',
        'ticket.reopenDate',
        'workspace.id',
        'worker.id',
        'worker.nickname',
        'worker.profile',
        'admin.id',
        'admin.nickname',
        'admin.profile',
        'epic.id',
      ])
      .leftJoin('ticket.workspace', 'workspace')
      .leftJoin('ticket.worker', 'worker')
      .leftJoin('ticket.admin', 'admin')
      .leftJoin('ticket.epic', 'epic')
      .where('ticket.workspaceId = :workspaceId', { workspaceId })
      .andWhere('ticket.isDeleted = false');
    return await querybuilder.getManyAndCount();
  }

  public async findOneByNameAndWorkspaceId(name: string, workspaceId: number) {
    const querybuilder = this.createQueryBuilder('ticket')
      .select([
        'ticket.id',
        'ticket.name',
        'ticket.status',
        'ticket.dueDate',
        'ticket.number',
        'ticket.completeDate',
        'ticket.reopenDate',
        'workspace.id',
        'worker.id',
        'worker.nickname',
        'worker.profile',
        'admin.id',
        'admin.nickname',
        'admin.profile',
        'epic.id',
      ])
      .leftJoin('ticket.workspace', 'workspace')
      .leftJoin('ticket.worker', 'worker')
      .leftJoin('ticket.admin', 'admin')
      .leftJoin('ticket.epic', 'epic')
      .where('ticket.workspaceId = :workspaceId', { workspaceId })
      .andWhere('ticket.name = :name', { name })
      .andWhere('ticket.isDeleted = false');
    return await querybuilder.getOne();
  }

  public async findMyTeamTicketList(teamId: number, month: string) {
    const [year, monthStr] = month.split('-');
    const startDate = new Date(parseInt(year), parseInt(monthStr) - 1, 1);
    const endDate = new Date(parseInt(year), parseInt(monthStr), 0);

    const querybuilder = this.createQueryBuilder('ticket')
      .select(['ticket.id', 'ticket.name', 'ticket.status', 'ticket.dueDate', 'ticket.number'])
      .leftJoin('ticket.workspace', 'workspace')
      .where('workspace.teamId = :teamId', { teamId })
      .andWhere('ticket.dueDate BETWEEN :startDate AND :endDate', {
        startDate,
        endDate,
      })
      .andWhere('ticket.isDeleted = false');
    return await querybuilder.getManyAndCount();
  }
}
