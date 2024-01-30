// ** Typeorm Imports
import { Repository } from 'typeorm';

// ** Custom Module Imports
import CustomRepository from '../../../global/repository/typeorm-ex.decorator';
import Epic from '../domain/epic.entity';

@CustomRepository(Epic)
export default class EpicRepository extends Repository<Epic> {}
