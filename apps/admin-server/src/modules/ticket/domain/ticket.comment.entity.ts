// ** Typeorm Imports
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm';

// ** enum, dto, entity Imports
import { BaseTimeEntity } from '@hi-dice/common';
import User from '../../user/domain/user.entity';
import Ticket from './ticket.entity';

@Entity({ name: 'TB_TICKET_COMMENT' })
export default class TicketComment extends BaseTimeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 255,
    name: 'content',
    comment: '내용',
    nullable: false,
  })
  content: string;

  @ManyToOne(() => User, (user) => user.ticketComment, {
    onDelete: 'CASCADE',
  })
  user: Relation<User>;

  @ManyToOne(() => Ticket, (ticket) => ticket.comment, {
    onDelete: 'CASCADE',
  })
  ticket: Relation<Ticket>;
}
