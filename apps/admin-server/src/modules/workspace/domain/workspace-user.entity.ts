// ** Typeorm Imports
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm';

// ** enum, dto, entity Imports
import { BaseTimeEntity } from '@repo/common';
import Workspace from './workspace.entity';
import TeamUser from '../../team/domain/team-user.entity';
import Role from '@/src/global/enum/Role';

@Entity({ name: 'TB_WORKSPACE_USER' })
export default class WorkspaceUser extends BaseTimeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: Role,
    comment: '역할',
    nullable: false,
  })
  role: Role;

  @Column({
    type: 'varchar',
    length: 120,
    comment: '초대자 ID',
    nullable: false,
  })
  invitedId: string;

  @ManyToOne(() => TeamUser, (teamUser) => teamUser.workspaceUser, {
    onDelete: 'CASCADE',
  })
  teamUser: Relation<TeamUser>;

  @ManyToOne(() => Workspace, (workspace) => workspace.workspaceUser, {
    onDelete: 'CASCADE',
  })
  workspace: Relation<Workspace>;
}
