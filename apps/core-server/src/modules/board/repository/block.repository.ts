// ** Typeorm Imports
import { Brackets, Repository } from 'typeorm';

// ** Custom Module Imports
import CustomRepository from '../../../global/repository/typeorm-ex.decorator';

// ** Dto Imports
import BoardBlock from '../domain/board-block.entity';

@CustomRepository(BoardBlock)
export default class BoardBlockRepository extends Repository<BoardBlock> {}
