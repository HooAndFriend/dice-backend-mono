// ** Typeorm Imports
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm';

// ** enum, dto, entity Imports
import BaseTimeEntity from '../../../global/domain/BaseTime.Entity';
import User from '../../user/domain/user.entity';
import Ticket from './ticket.entity';

@Entity({ name: 'TB_TICKET_FILE' })
export default class TicketFile extends BaseTimeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 255,
    name: 'url',
    comment: 'url',
    nullable: false,
  })
  url: string;

  @ManyToOne(() => Ticket, (ticket) => ticket.ticketFile, {
    onDelete: 'CASCADE',
    orphanedRowAction: 'delete',
  })
  ticket: Relation<Ticket>;
}
