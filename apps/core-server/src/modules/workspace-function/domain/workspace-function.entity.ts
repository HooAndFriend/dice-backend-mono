// ** Typeorm Imports
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm';

// ** enum, dto, entity Imports
import Workspace from '../../workspace/domain/workspace.entity';
import BaseCreatedTimeEntity from '@/src/global/domain/BaseCreatedTime.entity';
import DiceFunction from '@/src/global/enum/DiceFunction';

@Entity({ name: 'TB_WORKSPACE_FUNCTION' })
export default class WorkspaceFunction extends BaseCreatedTimeEntity {
  @PrimaryGeneratedColumn()
  id: number;

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
