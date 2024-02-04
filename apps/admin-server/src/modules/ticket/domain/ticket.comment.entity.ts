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
import BaseTimeEntity from '../../../global/domain/BaseTime.Entity';
import User from '../../user/domain/user.entity';
import Ticket from './ticket.entity';

@Entity({ name: 'TB_TICKET_COMMENT' })
export default class TicketComment extends BaseTimeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 30,
    name: 'content',
    comment: '내용',
    nullable: false,
  })
  content: string;

  @ManyToOne(() => User, (user) => user.ticketComment)
  user: Relation<User>;

  @ManyToOne(() => Ticket, (ticket) => ticket.comment)
  ticket: Relation<Ticket>;
}
