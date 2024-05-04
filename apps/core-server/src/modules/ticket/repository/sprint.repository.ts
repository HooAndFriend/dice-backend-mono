// ** Typeorm Imports
import { Repository } from 'typeorm';

// ** Custom Module Imports
import CustomRepository from '../../../global/repository/typeorm-ex.decorator';

// ** Dto Imports
import Sprint from '../domain/sprint.entity';
// ** Emum Imports

@CustomRepository(Sprint)
export default class SprintRepository extends Repository<Sprint> {
  public async findSprintList(workspaceId: number) {
    const queryBuilder = this.createQueryBuilder('sprint')
      .select([
        'sprint.id',
        'sprint.name',
        'sprint.orderId',
        'sprint.createdDate',
        'sprint.modifiedDate',
        'ticket.id',
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
      ])
      .leftJoin('sprint.ticket', 'ticket')
      .where('sprint.workspaceId = :workspaceId', { workspaceId })
      .orderBy('sprint.orderId', 'ASC');

    return queryBuilder.getManyAndCount();
  }
}
