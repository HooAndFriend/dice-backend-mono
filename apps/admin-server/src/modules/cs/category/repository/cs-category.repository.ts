// ** Typeorm Imports
import { Repository } from 'typeorm';

// ** Custom Module Imports
import CsCategory from '../domain/cs-category.entity';
import CustomRepository from '@/src/global/repository/typeorm-ex.decorator';

@CustomRepository(CsCategory)
export default class CsCategoryRepository extends Repository<CsCategory> {}
