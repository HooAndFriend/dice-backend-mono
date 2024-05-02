// ** Typeorm Imports
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm';

// ** enum, dto, entity Imports
import { BaseTimeEntity } from '@hi-dice/common';
import User from '../../user/domain/user.entity';
import Team from './team.entity';
import WorkspaceUser from '../../workspace/domain/workspace-user.entity';
import { RoleEnum } from '@hi-dice/common';

@Entity({ name: 'TB_TEAM_USER' })
export default class TeamUser extends BaseTimeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: RoleEnum,
    comment: '팀 역할',
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

  @ManyToOne(() => User, (user) => user.teamUser, {
    onDelete: 'CASCADE',
  })
  user: Relation<User>;

  @ManyToOne(() => Team, (team) => team.teamUser, {
    onDelete: 'CASCADE',
  })
  team: Relation<Team>;

  @OneToMany(() => WorkspaceUser, (workspaceUser) => workspaceUser.teamUser)
  workspaceUser: Relation<WorkspaceUser>[];
}
