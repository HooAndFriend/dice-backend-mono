// ** Typeorm Imports
import {
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm';

// ** enum, dto, entity Imports
import BaseTimeEntity from '../../../common/entity/BaseTime.Entity';
import Table from '../../erd/domain/table.entity';
import Workspace from '../../workspace/domain/workspace.entity';

@Entity({ name: 'TB_DIAGRAM' })
export default class Diagram extends BaseTimeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Workspace, (workspace) => workspace.diagram, {
    onDelete: 'CASCADE',
  })
  workspace: Relation<Workspace>;

  @OneToMany(() => Table, (table) => table.diagram)
  table: Relation<Table>[];
}
