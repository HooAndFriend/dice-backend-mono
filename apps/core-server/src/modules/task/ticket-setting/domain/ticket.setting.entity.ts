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
import { SettingUpdate } from '../dto/setting.update.dto';
import TicketSettingEnum from './ticket.setting.enum';
import Ticket from '../../ticket/domain/ticket.entity';

@Entity({ name: 'TB_TICKET_SETTING' })
export default class TicketSetting extends BaseTimeEntity {
  @PrimaryGeneratedColumn()
  ticketSettingId: number;

  @Column({
    type: 'enum',
    enum: TicketSettingEnum,
    comment: '티켓 셋팅 타입',
    nullable: false,
    default: TicketSettingEnum.OTHER,
  })
  type: TicketSettingEnum;

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

  @ManyToOne(() => Workspace, (workspace) => workspace.ticketSetting, {
    onDelete: 'CASCADE',
  })
  workspace: Relation<Workspace>;

  @OneToMany(() => Ticket, (ticket) => ticket.ticketSetting)
  ticket: Relation<Ticket>[];

  public changeTicketSetting(data: SettingUpdate) {
    this.name = data.name;
    this.description = data.description;
    this.type = data.type;
  }
}
