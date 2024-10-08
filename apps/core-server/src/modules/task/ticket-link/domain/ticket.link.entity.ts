// ** Typeorm Imports
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm';

// ** enum, dto, entity Imports
import Ticket from '../../ticket/domain/ticket.entity';
import { BaseCreatedTimeEntity, BaseTimeEntity } from '@hi-dice/common';

@Entity({ name: 'TB_TICKET_LINK' })
export default class TicketLink extends BaseCreatedTimeEntity {
  @PrimaryGeneratedColumn()
  ticketLinkId: number;

  @Column({
    type: 'int',
    name: 'parent_ticket_id',
    comment: '부모 티켓 아이디',
    nullable: false,
  })
  parentTicketId: number;

  @Column({
    type: 'int',
    name: 'child_ticket_id',
    comment: '자식 티켓 아이디',
    nullable: false,
  })
  childTicketId: number;

  @ManyToOne(() => Ticket, (ticket) => ticket.parentLink, {
    eager: true,
    onDelete: 'CASCADE',
    orphanedRowAction: 'delete',
  })
  @JoinColumn({ name: 'parent_ticket_id' })
  parentTicket: Relation<Ticket>;

  @ManyToOne(() => Ticket, (ticket) => ticket.childLink, {
    eager: true,
    onDelete: 'CASCADE',
    orphanedRowAction: 'delete',
  })
  @JoinColumn({ name: 'child_ticket_id' })
  childTicket: Relation<Ticket>;
}
