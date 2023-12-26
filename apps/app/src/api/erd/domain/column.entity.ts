// ** Typeorm Imports
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm';

// ** enum, dto, entity Imports
import BaseTimeEntity from '../../../common/entity/BaseTime.Entity';
import { ColumnType, IsNull } from '../../../common/enum/ErdType.enum';
import Table from './table.entity';
import Mapping from './mapping.entity';

@Entity({ name: 'TB_COLUMN' })
export default class Columns extends BaseTimeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: ColumnType,
    name: 'key',
    comment: 'PK FK 여부',
    nullable: true,
  })
  key: ColumnType;

  @Column({
    type: 'varchar',
    length: 50,
    name: 'logical_name',
    comment: '논리 컬럼',
    nullable: false,
  })
  logicalName: string;

  @Column({
    type: 'varchar',
    length: 50,
    name: 'physical_name',
    comment: '물리 컬럼',
    nullable: false,
  })
  physicalName: string;

  @Column({
    type: 'enum',
    enum: IsNull,
    name: 'isNull',
    comment: 'null 허용',
    nullable: false,
  })
  isNull: IsNull;

  @Column({
    type: 'varchar',
    length: 50,
    name: 'dataType',
    comment: '데이터 타입',
    nullable: true,
  })
  dataType: string;

  @Column({
    type: 'varchar',
    length: 50,
    name: 'option',
    comment: '옵션',
    nullable: true,
  })
  option: string;

  @Column({
    type: 'varchar',
    length: 50,
    name: 'comment',
    comment: '코멘트',
    nullable: true,
  })
  comment: string;

  @ManyToOne(() => Table, (table) => table.column)
  table: Relation<Table>;

  @OneToOne(() => Mapping, (mapping) => mapping.column)
  mapping: Relation<Mapping>[];
}
