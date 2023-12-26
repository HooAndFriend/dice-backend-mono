// ** Typeorm Imports
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm';

// ** enum, dto, entity Imports
import BaseTimeEntity from '../../../common/entity/BaseTime.Entity';
import Columns from './column.entity';
import Mapping from './mapping.entity';
import Diagram from '../../diagram/domain/diagram.entity';

@Entity({ name: 'TB_TABLE' })
export default class Table extends BaseTimeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 50,
    name: 'physical_name',
    comment: '테이블 이름',
    nullable: false,
  })
  physicalName: string;

  @Column({
    type: 'varchar',
    length: 50,
    name: 'logical_name',
    comment: '테이블 이름',
    nullable: false,
  })
  logicalName: string;

  @Column({
    type: 'varchar',
    length: 50,
    name: 'comment',
    comment: '코멘트',
    nullable: true,
  })
  comment: string;

  @ManyToOne(() => Diagram, (diagram) => diagram.table)
  diagram: Relation<Diagram>;

  @OneToMany(() => Columns, (column) => column.table)
  column: Relation<Columns>[];

  @OneToMany(
    () => Mapping,
    (mapping) => [mapping.tableParent, mapping.tableChild],
  )
  mapping: Relation<Mapping>[];
}
