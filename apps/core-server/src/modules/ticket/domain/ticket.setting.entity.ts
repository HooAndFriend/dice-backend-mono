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
import Workspace from '../../workspace/domain/workspace.entity';
import Ticket from './ticket.entity';
import TicketSettingEnum from './ticket.setting.enum';

@Entity({ name: 'TB_TICKET_SETTING' })
export default class TicketSetting extends BaseTimeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: TicketSettingEnum,
    comment: '티켓 셋팅 타입',
    nullable: false,
    default: TicketSettingEnum.OTHER,
  })
  profile: TicketSettingEnum;

  @Column({
    type: 'varchar',
    length: 10,
    name: 'color',
    comment: '타입 색',
    nullable: false,
  })
  color: string;

  @Column({
    type: 'varchar',
    length: 10,
    name: 'text_color',
    comment: '글자 색',
    default: '#ffffff',
    nullable: false,
  })
  textColor: string;

  @Column({
    type: 'varchar',
    length: 20,
    name: 'type',
    comment: '티켓 타입 명',
    nullable: false,
  })
  type: string;

  @Column({
    type: 'varchar',
    length: 40,
    name: 'description',
    comment: '티켓 타입 설명',
    nullable: false,
  })
  description: string;

  @ManyToOne(() => Workspace, (workspace) => workspace.ticketSetting, {
    onDelete: 'CASCADE',
  })
  workspace: Relation<Workspace>;

  @OneToMany(() => Ticket, (ticket) => ticket.ticketSetting)
  ticket: Relation<Ticket>[];
}
