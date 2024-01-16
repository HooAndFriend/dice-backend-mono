// ** Typeorm Imports
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm';

// ** enum, dto, entity Imports
import BaseTimeEntity from '../../../global/domain/BaseTime.Entity';
import Workspace from '../../workspace/domain/workspace.entity';
import TeamUser from '../../team-user/domain/team-user.entity';
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

  @ManyToOne(() => TeamUser, (teamUser) => teamUser.workspaceUser, {
    onDelete: 'CASCADE',
  })
  teamUser: Relation<TeamUser>;

  @ManyToOne(() => Workspace, (workspace) => workspace.workspaceUser, {
    onDelete: 'CASCADE',
  })
  workspace: Relation<Workspace>;
}
