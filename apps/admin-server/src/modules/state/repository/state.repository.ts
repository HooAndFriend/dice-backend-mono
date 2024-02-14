// ** Typeorm Imports
import { Repository } from 'typeorm';

// ** Custom Module Imports
import CustomRepository from '../../../global/repository/typeorm-ex.decorator';

// ** Dto Imports
import State from '../domain/state.entity';

@CustomRepository(State)
export default class StateRepository extends Repository<State> {}
