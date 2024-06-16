// ** Typeorm Imports
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm';

// ** enum, dto, entity Imports
import { BaseTimeEntity } from '@hi-dice/common';
import Ticket from '../../ticket/domain/ticket.entity';

@Entity({ name: 'TB_SPRINT' })
export default class Sprint extends BaseTimeEntity {
  @PrimaryGeneratedColumn()
  ticketId: number;

  @Column({
    type: 'varchar',
    length: 50,
    name: 'name',
    comment: '스프린트 명',
    nullable: false,
  })
  name: string;

  @Column({
    type: 'int',
    comment: '정렬 순서',
    nullable: false,
    default: 1,
  })
  orderId: number;

  @ManyToOne(() => Ticket, (ticket) => ticket.sprint, {
    onDelete: 'CASCADE',
    orphanedRowAction: 'delete',
  })
  ticket: Relation<Ticket>;
}
