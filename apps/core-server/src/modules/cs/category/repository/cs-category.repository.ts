// ** Typeorm Imports
import { Repository } from 'typeorm';

// ** Custom Module Imports
import CustomRepository from '../../../../global/repository/typeorm-ex.decorator';
import CsCategory from '../domain/cs-category.entity';

@CustomRepository(CsCategory)
export default class CsCategoryRepository extends Repository<CsCategory> {}
