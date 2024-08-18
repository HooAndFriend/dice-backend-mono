// ** Typeorm Imports
import { Repository } from 'typeorm';

// ** Custom Module Imports
import Sprint from '../domain/sprint.entity';
import CustomRepository from '@/src/global/repository/typeorm-ex.decorator';
import Ticket from '../../ticket/domain/ticket.entity';

@CustomRepository(Sprint)
export default class SprintRepository extends Repository<Sprint> {
  //Sprint리스트 조회
  public async getSprintsWithTickets() {
    const queryBuilder = this.createQueryBuilder('sprint')
      .leftJoinAndSelect('sprint.ticket', 'ticket')
      .select([
        'sprint.title',
        'sprint.startDate',
        'sprint.endDate',
        'ticket.ticketId',
        'ticket.name',
        'ticket.status',
        'ticket.dueDate',
      ])
      .orderBy('sprint.orderId', 'ASC');

    return await queryBuilder.getManyAndCount();
  }
}
