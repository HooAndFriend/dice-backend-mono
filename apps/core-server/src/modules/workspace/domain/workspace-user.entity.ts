// ** Typeorm Imports
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm';

// ** enum, dto, entity Imports
import { BaseTimeEntity } from '@hi-dice/common';
import Workspace from './workspace.entity';
import { RoleEnum } from '@hi-dice/common';
import User from '../../user/domain/user.entity';

@Entity({ name: 'TB_WORKSPACE_USER' })
export default class WorkspaceUser extends BaseTimeEntity {
  @PrimaryGeneratedColumn()
  workspaceUserId: number;

  @Column({
    type: 'enum',
    enum: RoleEnum,
    comment: '역할',
    nullable: false,
  })
  role: RoleEnum;

  @Column({
    type: 'varchar',
    length: 120,
    comment: '초대자 ID',
    nullable: true,
  })
  invitedId: string;

  @ManyToOne(() => User, (user) => user.workspaceUser, {
    onDelete: 'CASCADE',
  })
  user: Relation<User>;

  @ManyToOne(() => Workspace, (workspace) => workspace.workspaceUser, {
    onDelete: 'CASCADE',
  })
  workspace: Relation<Workspace>;
}
