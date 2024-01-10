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
        'ticket.*',
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
}
