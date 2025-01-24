// ** Typeorm Imports
import { Brackets, Repository } from 'typeorm';

// ** Custom Module Imports
import CustomRepository from '../../../global/repository/typeorm-ex.decorator';

// ** Dto Imports
import BoardContent from '../domain/board-content.entity';

@CustomRepository(BoardContent)
export default class BoardContentRepository extends Repository<BoardContent> {}
