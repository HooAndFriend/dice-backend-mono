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
import { BaseTimeEntity } from '@hi-dice/common';
import { UserType } from '@hi-dice/common';
import UserStatusEnum from './user-status.enum';
import WorkspaceUser from '../../workspace/domain/workspace-user.entity';
import Ticket from '../../task/ticket/domain/ticket.entity';
import TicketComment from '../../task/ticket-comment/domain/ticket.comment.entity';
import BoardMention from '../../board/domain/board-mention.entity';

@Entity({ name: 'TB_USER' })
@Unique(['email', 'token'])
export default class User extends BaseTimeEntity {
  @PrimaryGeneratedColumn()
  userId: number;

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

  @OneToMany(() => WorkspaceUser, (workspaceUser) => workspaceUser.user)
  workspaceUser: Relation<WorkspaceUser>[];

  @OneToMany(() => Ticket, (ticket) => [ticket.admin, ticket.worker])
  ticket: Relation<Ticket>[];

  @OneToMany(() => TicketComment, (ticketComment) => ticketComment.user)
  ticketComment: Relation<TicketComment>[];

  @OneToMany(() => BoardMention, (mention) => [mention.mentioner, mention.mentionedUser])
  mentions: Relation<BoardMention>[];

  public updateUserProfile(profile: string, nickname: string) {
    this.profile = profile;
    this.nickname = nickname;
  }
}
