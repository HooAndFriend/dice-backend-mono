// ** Typeorm Imports
import { Entity, ManyToOne, PrimaryGeneratedColumn, Relation } from 'typeorm';

// ** enum, dto, entity Imports
import BaseTimeEntity from '../../../common/entity/BaseTime.Entity';
import Workspace from '../../../api/workspace/domain/workspace.entity';

@Entity({ name: 'TB_WORKSPACE_API' })
export default class Api extends BaseTimeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Workspace, (workspace) => workspace.table)
  workspace: Relation<Workspace>;
}
