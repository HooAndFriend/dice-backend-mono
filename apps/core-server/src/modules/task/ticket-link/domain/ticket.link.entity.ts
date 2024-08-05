// ** Typeorm Imports
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm';

// ** enum, dto, entity Imports
import { BaseCreatedTimeEntity, BaseTimeEntity } from '@hi-dice/common';
import Ticket from '../../ticket/domain/ticket.entity';

@Entity({ name: 'TB_TICKET_LINK' })
export default class TicketLink extends BaseCreatedTimeEntity {
  @PrimaryGeneratedColumn()
  ticketLinkId: number;

  @Column({
    type: 'int',
    comment: '상위 티켓 id',
    nullable: false,
  })
  parantTicketId: number;

  @Column({
    type: 'int',
    comment: '하위 티켓 id',
    nullable: false,
  })
  childTicketId: number;

  @ManyToOne(() => Ticket, (ticket) => ticket.ticketLink, {
    onDelete: 'CASCADE',
    orphanedRowAction: 'delete',
  })
  ticket: Relation<Ticket>;
}
