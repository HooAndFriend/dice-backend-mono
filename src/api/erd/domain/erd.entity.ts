// ** Typeorm Imports
import { Entity, ManyToOne, PrimaryGeneratedColumn, Relation } from 'typeorm';

// ** enum, dto, entity Imports
import BaseTimeEntity from 'src/common/entity/BaseTime.Entity';
import Workspace from 'src/api/workspace/domain/workspace.entity';

@Entity({ name: 'TB_WORKSPACE_ERD' })
export default class Erd extends BaseTimeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Workspace, (workspace) => workspace.erd)
  workspace: Relation<Workspace>;
}
