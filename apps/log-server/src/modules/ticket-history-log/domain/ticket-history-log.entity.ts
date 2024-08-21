// ** Typeorm Imports
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

// ** enum, dto, entity Imports
import { BaseCreatedTimeEntity, TicketHistoryTypeEnum } from '@hi-dice/common';

@Entity({ name: 'TB_TICKET_HISTORY_LOG' })
export default class TicketHistoryLog extends BaseCreatedTimeEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  ticketHistoryLogId: number;

  @Column({
    comment: 'TICKET ID',
    name: 'ticket_id',
    nullable: false,
  })
  ticketId: number;

  @Column({
    type: 'varchar',
    length: 120,
    comment: '로그 생성자 이메일',
    nullable: false,
    name: 'creator_email',
  })
  creatorEmail: string;

  @Column({
    type: 'varchar',
    length: 50,
    comment: '로그 생성자 닉네임',
    nullable: false,
    name: 'creator_nickname',
  })
  creatorNickname: string;

  @Column({
    type: 'varchar',
    length: 255,
    comment: '로그 생성자 프로필',
    nullable: false,
    name: 'creator_profile',
  })
  creatorProfile: string;

  @Column({
    type: 'enum',
    comment: 'Ticket 변경 이력 종류',
    enum: TicketHistoryTypeEnum,
    nullable: false,
  })
  type: TicketHistoryTypeEnum;

  @Column({
    type: 'text',
    comment: '기록 내용',
    nullable: true,
    name: 'before_log',
  })
  beforeLog: string;

  @Column({
    type: 'varchar',
    length: 120,
    comment: '이전 유저 이메일',
    nullable: true,
    name: 'before_email',
  })
  beforeEmail: string;

  @Column({
    type: 'varchar',
    length: 50,
    comment: '이전 유저 닉네임',
    nullable: true,
    name: 'before_nickname',
  })
  beforeNickname: string;

  @Column({
    type: 'varchar',
    length: 255,
    comment: '이전 유저 프로필',
    nullable: true,
    name: 'before_profile',
  })
  beforeProfile: string;

  @Column({
    type: 'text',
    comment: '기록 내용',
    nullable: true,
    name: 'after_log',
  })
  afterLog: string;

  @Column({
    type: 'varchar',
    length: 120,
    comment: '신규 유저 이메일',
    nullable: true,
    name: 'after_email',
  })
  afterEmail: string;

  @Column({
    type: 'varchar',
    length: 50,
    comment: '신규 유저 닉네임',
    nullable: true,
    name: 'after_nickname',
  })
  afterNickname: string;

  @Column({
    type: 'varchar',
    length: 255,
    comment: '신규 유저 프로필',
    nullable: true,
    name: 'after_profile',
  })
  afterProfile: string;
}
