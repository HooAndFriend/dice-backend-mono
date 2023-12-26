// ** Typeorm Imports
import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Relation,
  Unique,
} from 'typeorm';

// ** enum, dto, entity Imports
import BaseTimeEntity from '../../../common/entity/BaseTime.Entity';
import TeamUser from '../../team-user/domain/team-user.entity';

@Entity({ name: 'TB_TEAM' })
@Unique(['name'])
export default class Team extends BaseTimeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 30,
    comment: '팀 이름',
    nullable: false,
  })
  name: string;

  @Column({
    type: 'varchar',
    length: 255,
    comment: '팀 이미지',
    nullable: false,
  })
  profile: string;

  @Column({
    type: 'text',
    comment: '팀 설명',
    nullable: false,
  })
  description: string;

  @OneToMany(() => TeamUser, (teamUser) => teamUser.user)
  teamUser: Relation<TeamUser>[];
}
