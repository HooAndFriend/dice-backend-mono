// ** Typeorm Imports
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm';

// ** enum, dto, entity Imports
import Workspace from './workspace.entity';
import { BaseCreatedTimeEntity } from '@hi-dice/common';
import { DiceFunction } from '@hi-dice/common';

@Entity({ name: 'TB_WORKSPACE_FUNCTION' })
export default class WorkspaceFunction extends BaseCreatedTimeEntity {
  @PrimaryGeneratedColumn()
  workspaceFunctionId: number;

  @Column({
    type: 'enum',
    enum: DiceFunction,
    comment: '기능 이름',
    nullable: false,
  })
  function: DiceFunction;

  @ManyToOne(() => Workspace, (workspace) => workspace.workspaceFunction, {
    onDelete: 'CASCADE',
  })
  workspace: Relation<Workspace>;
}
