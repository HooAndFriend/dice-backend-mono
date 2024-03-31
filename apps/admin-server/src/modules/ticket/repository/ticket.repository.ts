// ** Typeorm Imports
import { Repository } from 'typeorm';

// ** Custom Module Imports
import CustomRepository from '../../../global/repository/typeorm-ex.decorator';
import Ticket from '../domain/ticket.entity';
import RequestTicketFindDto from '../dto/ticket.find.dto';

@CustomRepository(Ticket)
export default class TicketRepository extends Repository<Ticket> {
  public async findAllTicket() {
    const queryBuilder = this.createQueryBuilder('ticket')
      .select([
        'ticket.id',
        'ticket.name',
        'ticket.status',
        'ticket.content',
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
      .leftJoin('ticket.worker', 'worker');

    return await queryBuilder.getManyAndCount();
  }

  public async findTicketByQuery(findQuery: RequestTicketFindDto) {
    const queryBuilder = this.createQueryBuilder('ticket')
      .select([
        'ticket.id',
        'ticket.name',
        'ticket.status',
        'ticket.content',
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
      .leftJoin('ticket.worker', 'worker');
    if (findQuery.content) {
      queryBuilder.andWhere('ticket.content LIKE :content', {
        content: `%${findQuery.content}%`,
      });
    }
    if (findQuery.dueDate) {
      queryBuilder.andWhere('ticket.dueDate >= :dueDate', {
        dueDate: `${findQuery.dueDate}`,
      });
    }
    if (findQuery.completeDate) {
      queryBuilder.andWhere('ticket.completeDate <= :completeDate', {
        completeDate: `${findQuery.completeDate}`,
      });
    }

    return await queryBuilder.getManyAndCount();
  }
}
