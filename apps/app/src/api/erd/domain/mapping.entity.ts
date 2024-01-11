// ** Typeorm Imports
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm';

// ** enum, dto, entity Imports
import BaseTimeEntity from '../../../common/entity/BaseTime.Entity';
import Table from './table.entity';
import Columns from './column.entity';
import { MappingType } from '../../../common/enum/ErdType.enum';

@Entity({ name: 'TB_MAPPING' })
export default class Mapping extends BaseTimeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: MappingType,
    name: 'type',
    comment: '매핑 타입',
    nullable: false,
  })
  type: MappingType;

  @ManyToOne(() => Table, (table) => table.mapping, {
    onDelete: 'CASCADE',
  })
  tableParent: Relation<Table>;

  @ManyToOne(() => Table, (table) => table.mapping, {
    onDelete: 'CASCADE',
  })
  tableChild: Relation<Table>;

  @ManyToOne(() => Columns, (column) => column.mapping, {
    onDelete: 'CASCADE',
  })
  column: Relation<Columns>;
}
