// ** Typeorm Imports
import { Repository } from 'typeorm';

// ** Custom Module Imports
import CustomRepository from '../../../repository/typeorm-ex.decorator';

// ** Dto Imports
import Qa from '../domain/qa.entity';

@CustomRepository(Qa)
export default class QaRepository extends Repository<Qa> {
}
