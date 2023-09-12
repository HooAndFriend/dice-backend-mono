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
