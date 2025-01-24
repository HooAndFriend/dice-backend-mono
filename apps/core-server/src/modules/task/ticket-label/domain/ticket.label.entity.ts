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
import Workspace from '../../../workspace/domain/workspace.entity';
import Ticket from '../../ticket/domain/ticket.entity';
import { LabelUpdate } from '../dto/label.update.dto';

@Entity({ name: 'TB_TICKET_LABEL' })
export default class TicketLabel extends BaseTimeEntity {
  @PrimaryGeneratedColumn()
  ticketLabelId: number;

  @Column({
    type: 'varchar',
    length: 20,
    name: 'name',
    comment: '티켓 타입 명',
    nullable: false,
  })
  name: string;

  @Column({
    type: 'varchar',
    length: 40,
    name: 'description',
    comment: '티켓 타입 설명',
    nullable: false,
  })
  description: string;

  @Column({
    type: 'varchar',
    length: 20,
    name: 'bg_color',
    comment: '배경색',
    nullable: false,
  })
  bgColor: string;

  @Column({
    type: 'varchar',
    length: 20,
    comment: '글자색',
    nullable: false,
  })
  color: string;

  @ManyToOne(() => Workspace, (workspace) => workspace.ticketLabel, {
    onDelete: 'CASCADE',
  })
  workspace: Relation<Workspace>;

  @OneToMany(() => Ticket, (ticket) => ticket.ticketLabel)
  ticket: Relation<Ticket>[];

  public update(data: LabelUpdate) {
    this.name = data.name;
    this.description = data.description;
    this.bgColor = data.bgColor;
    this.color = data.color;
  }
}
