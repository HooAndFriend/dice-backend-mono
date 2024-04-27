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
import { BaseTimeEntity } from '@repo/common';
import TeamUser from './team-user.entity';
import Workspace from '../../workspace/domain/workspace.entity';

@Entity({ name: 'TB_TEAM' })
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
    type: 'uuid',
    comment: 'UUID Code',
    nullable: false,
  })
  uuid: string;

  @Column({
    type: 'varchar',
    length: 20,
    comment: 'Team Code',
    nullable: false,
  })
  code: string;

  @Column({
    type: 'boolean',
    comment: '개인 팀 여부',
    nullable: false,
  })
  isPersonal: boolean;

  @Column({
    type: 'varchar',
    length: 120,
    comment: '생성 유저 ID',
    nullable: false,
  })
  createdId: string;

  @Column({
    type: 'text',
    comment: '팀 설명',
    nullable: false,
  })
  description: string;

  @OneToMany(() => TeamUser, (teamUser) => teamUser.user)
  teamUser: Relation<TeamUser>[];

  @OneToMany(() => Workspace, (workspace) => workspace.team)
  workspace: Relation<Workspace>[];

  public async updateTeamProfile(profile: string, name: string) {
    this.profile = profile;
    this.name = name;
  }
}
