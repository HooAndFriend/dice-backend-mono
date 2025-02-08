// ** Typeorm Imports
import { Repository } from 'typeorm';

// ** Custom Module Imports
import CustomRepository from '../../../global/repository/typeorm-ex.decorator';

// ** Dto Imports
import BoardMention from '../domain/board-mention.entity';

@CustomRepository(BoardMention)
export default class BoardMentionRepository extends Repository<BoardMention> {}
