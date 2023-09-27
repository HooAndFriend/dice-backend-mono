// ** Typeorm Imports
import { Repository } from 'typeorm';

// ** Custom Module Imports
import CustomRepository from '../../../repository/typeorm-ex.decorator';
import Erd from '../domain/erd.entity';

@CustomRepository(Erd)
export default class ErdRepository extends Repository<Erd> {}
