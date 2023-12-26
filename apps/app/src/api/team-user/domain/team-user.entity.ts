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
import User from '../../user/domain/user.entity';
import Team from '../../team/domain/team.entity';

@Entity({ name: 'TB_TEAM_USER' })
export default class TeamUser extends BaseTimeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 30,
    comment: '팀 이름',
    nullable: false,
  })
  role: Role;

  @ManyToOne(() => User, (user) => user.teamUser)
  user: Relation<User>;

  @ManyToOne(() => Team, (team) => team.teamUser)
  team: Relation<Team>;
}
