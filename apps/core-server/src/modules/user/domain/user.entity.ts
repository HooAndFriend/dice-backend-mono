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
import { UserType } from '../../../global/enum/UserType.enum';
import TeamUser from '../../team/domain/team-user.entity';
import Epic from '../../ticket/domain/epic.entity';
import Qa from '@/src/modules/qa/domain/qa.entity';
import Comment from '@/src/modules/qa/domain/qa.comment.entity';
import Ticket from '../../ticket/domain/ticket.entity';
import TicketComment from '../../ticket/domain/ticket.comment.entity';
import UserStatusEnum from './user-status.enum';

@Entity({ name: 'TB_USER' })
@Unique(['email', 'token'])
export default class User extends BaseTimeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 120,
    comment: '이메일',
    nullable: false,
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
    type: 'varchar',
    length: 255,
    comment: 'FCM 토큰',
    name: 'fcm_token',
    nullable: true,
  })
  fcmToken: string;

  @Column({
    type: 'enum',
    enum: UserType,
    comment: '로그인 종류',
    nullable: false,
  })
  type: UserType;

  @Column({
    type: 'enum',
    enum: UserStatusEnum,
    comment: '유저 상태',
    nullable: false,
  })
  status: UserStatusEnum;

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

  @Column({
    type: 'datetime',
    comment: '마지막 로그인 시간',
    name: 'last_login_date',
    nullable: true,
  })
  lastLoginDate: Date;

  @Column({
    type: 'datetime',
    name: 'deleted_date',
    comment: '삭제 시간',
    nullable: true,
  })
  deletedDate: Date;

  @Column({
    type: 'varchar',
    name: 'deleted_reason',
    length: 255,
    comment: '삭제 사유',
    nullable: true,
  })
  deletedReason: string;

  @OneToMany(() => TeamUser, (teamUser) => teamUser.user)
  teamUser: Relation<TeamUser>[];

  @OneToMany(() => Epic, (epic) => epic.admin)
  epic: Relation<Epic>[];

  @OneToMany(() => Ticket, (ticket) => [ticket.admin, ticket.worker])
  ticket: Relation<Ticket>[];

  @OneToMany(() => TicketComment, (ticketComment) => ticketComment.user)
  ticketComment: Relation<TicketComment>[];

  @OneToMany(() => Qa, (qa) => [qa.admin, qa.worker])
  qa: Relation<Qa>[];

  @OneToMany(() => Comment, (comment) => comment.user)
  comment: Relation<Comment>[];

  public updateUserProfile(profile: string, nickname: string) {
    this.profile = profile;
    this.nickname = nickname;
  }
}
