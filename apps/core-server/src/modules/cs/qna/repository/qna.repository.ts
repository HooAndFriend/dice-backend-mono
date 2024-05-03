// ** Typeorm Imports
import { Repository } from 'typeorm';

// ** Custom Module Imports
import CustomRepository from '../../../../global/repository/typeorm-ex.decorator';
import Qna from '../domain/qna.entity';

@CustomRepository(Qna)
export default class QnaRepository extends Repository<Qna> {}
