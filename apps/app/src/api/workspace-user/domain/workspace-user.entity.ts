// ** Typeorm Imports
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm';

// ** enum, dto, entity Imports
import BaseTimeEntity from '../../../common/entity/BaseTime.Entity';
import { WorkspaceRoleType } from '../../../common/enum/WorkspaceRoleType.enum';
import Workspace from '../../workspace/domain/workspace.entity';
import TeamUser from '../../team-user/domain/team-user.entity';

@Entity({ name: 'TB_WORKSPACE_USER' })
export default class WorkspaceUser extends BaseTimeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: WorkspaceRoleType,
    comment: '역할',
    nullable: false,
  })
  role: WorkspaceRoleType;

  @ManyToOne(() => TeamUser, (teamUser) => teamUser.workspaceUser)
  teamUser: Relation<TeamUser>;

  @ManyToOne(() => Workspace, (workspace) => workspace.workspaceUser)
  workspace: Relation<Workspace>;
}
