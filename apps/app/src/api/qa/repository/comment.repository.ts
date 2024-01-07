// ** Typeorm Imports
import { Repository } from 'typeorm';

// ** Custom Module Imports
import CustomRepository from '../../../repository/typeorm-ex.decorator';

// ** Dto Imports
import Comment from '../domain/comment.entity';

@CustomRepository(Comment)
export default class CommentRepository extends Repository<Comment> {
}
