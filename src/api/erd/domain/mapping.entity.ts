// ** Typeorm Imports
import { Entity, ManyToOne, PrimaryGeneratedColumn, Relation } from 'typeorm';

// ** enum, dto, entity Imports
import BaseTimeEntity from '../../../common/entity/BaseTime.Entity';
import Table from './table.entity';
import Columns from './column.entity';

@Entity({ name: 'TB_MAPPING' })
export default class Mapping extends BaseTimeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Table, (table) => table.mapping)
  tableParent: Relation<Table>;

  @ManyToOne(() => Table, (table) => table.mapping)
  tableChild: Relation<Table>;

  @ManyToOne(() => Columns, (column) => column.mapping)
  column: Relation<Columns>;
}
