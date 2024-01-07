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
import BaseCreatedTimeEntity from '@/src/common/entity/BaseCreatedTime.entity';
import DiceFunction from '@/src/common/enum/DiceFunction';

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

  @ManyToOne(() => Workspace, (workspace) => workspace.workspaceFunction)
  workspace: Relation<Workspace>;
}
