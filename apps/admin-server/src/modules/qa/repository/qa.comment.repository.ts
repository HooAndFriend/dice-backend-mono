// ** Typeorm Imports
import { Repository } from 'typeorm';

// ** Custom Module Imports
import CustomRepository from '../../../global/repository/typeorm-ex.decorator';

// ** Dto Imports
import QaComment from '../domain/qa.comment.entity';

@CustomRepository(QaComment)
export default class QaCommentRepository extends Repository<QaComment> {}
