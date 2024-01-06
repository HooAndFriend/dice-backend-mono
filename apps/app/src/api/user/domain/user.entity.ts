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
import { UserType } from '../../../common/enum/UserType.enum';
import TeamUser from '../../team-user/domain/team-user.entity';
import Workspace from '../../workspace/domain/workspace.entity';
import Qa from '@/src/api/qa/domain/qa.entity';
import Comment from '@/src/api/qa/domain/comment.entity';

@Entity({ name: 'TB_USER' })
@Unique(['email', 'token'])
export default class User extends BaseTimeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 120,
    comment: '이메일',
    nullable: true,
  })
  email: string;

  @Column({
    type: 'varchar',
    length: 120,
    comment: '비밀번호',
    nullable: true,
  })
  password: string;

  @Column({
    type: 'varchar',
    length: 150,
    comment: '소셜 토큰',
    nullable: true,
  })
  token: string;

  @Column({
    type: 'enum',
    enum: UserType,
    comment: '로그인 종류',
    nullable: false,
  })
  type: UserType;

  @Column({
    type: 'varchar',
    length: 50,
    comment: '닉네임',
    nullable: false,
  })
  nickname: string;

  @Column({
    type: 'varchar',
    length: 255,
    comment: '프로필 이미지',
    nullable: false,
  })
  profile: string;

  @OneToMany(() => TeamUser, (teamUser) => teamUser.user)
  teamUser: Relation<TeamUser>[];

  @OneToMany(() => Workspace, (workspace) => workspace.user)
  workspace: Relation<Workspace>[];

  @OneToMany(() => Qa, (qa) => [qa.admin, qa.worker])
  qa: Relation<Qa>[];

  @OneToMany(() => Comment, (comment) => comment.user)
  comment: Relation<Comment>[];
}
