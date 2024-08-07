// ** Typeorm Imports
import { Repository } from 'typeorm';

// ** Utils Imports
import CustomRepository from '@/src/global/repository/typeorm-ex.decorator';

// ** Dto Imports
import Epic from '../domain/epic.entity';

@CustomRepository(Epic)
export default class EpicRepository extends Repository<Epic> {}
