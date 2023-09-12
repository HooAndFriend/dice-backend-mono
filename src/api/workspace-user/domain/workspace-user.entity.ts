// ** Typeorm Imports
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

// ** enum, dto, entity Imports
import BaseTimeEntity from 'src/common/entity/BaseTime.Entity';
import { WorkspaceRoleType } from 'src/enums/WorkspaceRoleType.enum';
import User from 'src/api/user/domain/user.entity';
import Workspace from 'src/api/workspace/domain/workspace.entity';

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

  @ManyToOne(() => User, (user) => user.workspaceUser)
  user: User;

  @ManyToOne(() => Workspace, (workspace) => workspace.workspaceUser)
  workspace: Workspace;
}
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjk0NTA0MjI3LCJleHAiOjE2OTQ1MDc4Mjd9.WuWEePafsidSEE4jCeOTn7Ba1cyI7WfzHS0R2Bd_cRY
