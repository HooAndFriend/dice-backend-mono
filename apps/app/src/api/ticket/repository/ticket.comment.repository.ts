// ** Typeorm Imports
import { Repository } from 'typeorm';

// ** Custom Module Imports
import CustomRepository from '../../../repository/typeorm-ex.decorator';
import TicketComment from '../domain/ticket.comment.entity';

@CustomRepository(TicketComment)
export default class TicketCommentRepository extends Repository<TicketComment> {
  public async findCommentById(commentId: number) {
    const querybuilder = this.createQueryBuilder('comment')
      .select(['comment.id', 'comment.content', 'user.id', 'ticket.id'])
      .leftJoin('comment.ticket', 'ticket')
      .leftJoin('comment.user', 'user')
      .where('comment.id = :commentId', { commentId });

    return querybuilder.getOne();
  }
}
