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
import WorkspaceUser from './workspace-user.entity';
import TicketSetting from '../../task/ticket-setting/domain/ticket.setting.entity';
import Board from '../../board/domain/board.entity';
import Ticket from '../../task/ticket/domain/ticket.entity';
import Sprint from '../../task/sprint/domain/sprint.entity';
import Epic from '../../task/epic/domain/epic.entity';
import TicketLabel from '../../task/ticket-label/domain/ticket.label.entity';

@Entity({ name: 'TB_WORKSPACE' })
export default class Workspace extends BaseTimeEntity {
  @PrimaryGeneratedColumn()
  workspaceId: number;

  @Column({
    type: 'varchar',
    length: 50,
    comment: '워크스페이스 이름',
    nullable: false,
  })
  name: string;

  @Column({
    type: 'text',
    comment: '워크스페이스 설명',
    nullable: false,
  })
  comment: string;

  @Column({
    type: 'varchar',
    length: 255,
    comment: '워크스페이스 프로필 이미지',
    nullable: false,
  })
  profile: string;

  @Column({
    type: 'uuid',
    comment: 'UUID Code',
    nullable: false,
  })
  uuid: string;

  @Column({
    type: 'varchar',
    length: 20,
    comment: 'Workspace Code',
    nullable: false,
  })
  code: string;

  @Column({
    type: 'varchar',
    length: 120,
    comment: '생성 유저 ID',
    nullable: false,
  })
  createdId: string;

  @Column({
    type: 'boolean',
    comment: '개인 워크스페이스 여부',
    nullable: false,
  })
  isPersonal: boolean;

  @Column({
    type: 'boolean',
    comment: '삭제 여부',
    nullable: false,
    default: false,
  })
  isDeleted: boolean;

  @OneToMany(() => WorkspaceUser, (workspaceUser) => workspaceUser.workspace, {
    cascade: true,
  })
  workspaceUser: Relation<WorkspaceUser>[];

  @OneToMany(() => Ticket, (ticket) => ticket.workspace)
  ticket: Relation<Ticket>[];

  @OneToMany(() => TicketSetting, (ticketSetting) => ticketSetting.workspace)
  ticketSetting: Relation<TicketSetting>[];

  @OneToMany(() => TicketLabel, (ticketLabel) => ticketLabel.workspace)
  ticketLabel: Relation<TicketLabel>[];

  @OneToMany(() => Board, (board) => board.workspace)
  board: Relation<Board>[];

  @OneToMany(() => Sprint, (sprint) => sprint.workspace)
  sprint: Relation<Sprint>[];

  @OneToMany(() => Epic, (epic) => epic.workspace)
  epic: Relation<Epic>[];

  public toDelete(): void {
    this.isDeleted = true;
  }
}
