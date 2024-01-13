// ** Typeorm Imports
import { Repository } from 'typeorm';

// ** Custom Module Imports
import CustomRepository from '../../../repository/typeorm-ex.decorator';
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
        'ticket.content',
        'ticket.storypoint',
        'ticket.dueDate',
        'ticket.completeDate',
        'ticket.reopenDate',
        'workspace.id',
        'admin.id',
        'admin.nickname',
        'admin.profile',
        'worker.id',
        'worker.nickname',
        'worker.profile',
      ])
      .leftJoin('ticket.workspace', 'workspace')
      .leftJoin('ticket.admin', 'admin')
      .leftJoin('ticket.worker', 'worker')
      .where('ticket.id = :ticketId', { ticketId });
    return await querybuilder.getOne();
  }

  public async findAllTicketByEpicId(epicId: number) {
    const querybuilder = this.createQueryBuilder('ticket')
      .select([
        'ticket.id',
        'ticket.name',
        'ticket.status',
        'ticket.content',
        'ticket.content',
        'ticket.storypoint',
        'ticket.dueDate',
        'ticket.completeDate',
        'ticket.reopenDate',
        'workspace.id',
        'worker.id',
        'worker.nickname',
        'worker.profile',
        'epic.id',
      ])
      .leftJoin('ticket.workspace', 'workspace')
      .leftJoin('ticket.worker', 'worker')
      .leftJoin('ticket.epic', 'epic')
      .where('ticket.epic = :epicId', { epicId });
    return await querybuilder.getManyAndCount();
  }

  public async findAllTicketByWorkspaceId(workspaceId: number) {
    const querybuilder = this.createQueryBuilder('ticket')
      .select([
        'ticket.id',
        'ticket.name',
        'ticket.status',
        'ticket.content',
        'ticket.content',
        'ticket.storypoint',
        'ticket.dueDate',
        'ticket.completeDate',
        'ticket.reopenDate',
        'workspace.id',
        'worker.id',
        'worker.nickname',
        'worker.profile',
      ])
      .leftJoin('ticket.workspace', 'workspace')
      .leftJoin('ticket.worker', 'worker')
      .leftJoin('ticket.epic', 'epic')
      .where('ticket.workspaceId = :workspaceId', { workspaceId });
    return await querybuilder.getManyAndCount();
  }
}
