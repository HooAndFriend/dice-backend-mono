// ** Typeorm Imports
import { Repository } from 'typeorm';

// ** Custom Module Imports
import Sprint from '../domain/sprint.entity';
import CustomRepository from '@/src/global/repository/typeorm-ex.decorator';

@CustomRepository(Sprint)
export default class SprintRepository extends Repository<Sprint> {}
