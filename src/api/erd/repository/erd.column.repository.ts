import { Repository } from 'typeorm';
import CustomRepository from '../../../repository/typeorm-ex.decorator';
import Columns from '../domain/erd.column.entity';

@CustomRepository(Columns)
export default class ColumnRepository extends Repository<Columns> {}
