// ** Typeorm Imports
import { Repository } from 'typeorm';

// ** Custom Module Imports
import CustomRepository from '../../../repository/typeorm-ex.decorator';
import Table from '../domain/erd.table.entity';

@CustomRepository(Table)
export default class TableRepository extends Repository<Table> {}
