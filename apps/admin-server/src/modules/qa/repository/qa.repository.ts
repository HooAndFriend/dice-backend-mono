// ** Typeorm Imports
import { Repository } from 'typeorm';

// ** Custom Module Imports
import CustomRepository from '../../../global/repository/typeorm-ex.decorator';

// ** Dto Imports
import Qa from '../domain/qa.entity';
// ** Emum Imports
import { QaStatus } from '../../../global/enum/QaStatus.enum';

@CustomRepository(Qa)
export default class QaRepository extends Repository<Qa> {}
