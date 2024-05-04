// ** Typeorm Imports
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

// ** enum, dto, entity Imports
import { BaseCreatedTimeEntity, TicketHistoryTypeEnum } from '@hi-dice/common';

@Entity({ name: 'TB_TICKET_HISTORY_LOG' })
export default class TicketHistoryLog extends BaseCreatedTimeEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({
    comment: 'TICKET ID',
    name: 'ticket_id',
    nullable: false,
  })
  ticketId: number;

  @Column({
    type: 'varchar',
    length: 120,
    comment: '이메일',
    nullable: false,
  })
  email: string;

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
  })
  log: string;
}
