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
import BaseTimeEntity from '../../../common/entity/BaseTime.Entity';
import User from '../../user/domain/user.entity';
import Team from '../../team/domain/team.entity';
import WorkspaceUser from '../../workspace-user/domain/workspace-user.entity';
import Role from '@/src/common/enum/Role';

@Entity({ name: 'TB_TEAM_USER' })
export default class TeamUser extends BaseTimeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 30,
    comment: '팀 역할',
    nullable: false,
  })
  role: Role;

  @ManyToOne(() => User, (user) => user.teamUser)
  user: Relation<User>;

  @ManyToOne(() => Team, (team) => team.teamUser)
  team: Relation<Team>;

  @OneToMany(() => WorkspaceUser, (workspaceUser) => workspaceUser.teamUser)
  workspaceUser: Relation<WorkspaceUser>[];
}
