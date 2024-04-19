// ** Typeorm Imports
import { Repository } from 'typeorm';

// ** Custom Module Imports
import CustomRepository from '../../../global/repository/typeorm-ex.decorator';

// ** Dto Imports
import Board from '../domain/board.entity';

@CustomRepository(Board)
export default class BoardRepository extends Repository<Board> {}
