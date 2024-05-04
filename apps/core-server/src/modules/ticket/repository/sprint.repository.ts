// ** Typeorm Imports
import { Repository } from 'typeorm';

// ** Custom Module Imports
import CustomRepository from '../../../global/repository/typeorm-ex.decorator';

// ** Dto Imports
import Sprint from '../domain/sprint.entity';
// ** Emum Imports

@CustomRepository(Sprint)
export default class SprintRepository extends Repository<Sprint> {}
