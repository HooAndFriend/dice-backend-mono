// ** Typeorm Imports
import { Repository } from 'typeorm';

// ** Custom Module Imports
import CustomRepository from '../../../global/repository/typeorm-ex.decorator';
import TicketComment from '../domain/ticket.comment.entity';

@CustomRepository(TicketComment)
export default class TicketCommentRepository extends Repository<TicketComment> {}
