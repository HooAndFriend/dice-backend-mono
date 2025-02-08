// ** Typeorm Imports
import { Repository } from 'typeorm';

// ** Custom Module Imports
import CustomRepository from '@/src/global/repository/typeorm-ex.decorator';

// ** entity Imports
import TicketLink from '../domain/ticket.link.entity';

@CustomRepository(TicketLink)
export default class TicketLinkRepository extends Repository<TicketLink> {
  public async findChildTicketList(ticketId: number): Promise<TicketLink[]> {
    return this.createQueryBuilder('ticketLink')
      .select([
        'ticketLink.ticketLinkId',
        'ticket.ticketId',
        'ticket.name',
        'ticket.status',
        'ticket.code',
        'ticket.dueDate',
        'ticket.completeDate',
        'ticket.reopenDate',
        'ticket.orderId',
        'worker.userId',
        'worker.email',
        'worker.nickname',
        'worker.profile',
        'ticketSetting.ticketSettingId',
        'ticketSetting.name',
        'ticketSetting.type',
      ])
      .leftJoin('ticketLink.childTicket', 'ticket', 'ticket.isDeleted = false')
      .leftJoin('ticket.ticketSetting', 'ticketSetting')
      .leftJoin('ticket.worker', 'worker')
      .where('ticketLink.parentTicketId = :ticketId', { ticketId })
      .getMany();
  }

  public async findParentTicketList(ticketId: number): Promise<TicketLink[]> {
    return this.createQueryBuilder('ticketLink')
      .select([
        'ticketLink.ticketLinkId',
        'ticket.ticketId',
        'ticket.name',
        'ticket.status',
        'ticket.code',
        'ticket.dueDate',
        'ticket.completeDate',
        'ticket.reopenDate',
        'ticket.orderId',
        'worker.userId',
        'worker.email',
        'worker.nickname',
        'worker.profile',
        'ticketSetting.ticketSettingId',
        'ticketSetting.name',
        'ticketSetting.type',
      ])
      .leftJoin('ticketLink.childTicket', 'ticket', 'ticket.isDeleted = false')
      .leftJoin('ticket.ticketSetting', 'ticketSetting')
      .leftJoin('ticket.worker', 'worker')
      .where('ticketLink.childTicketId = :ticketId', { ticketId })
      .getMany();
  }
}
