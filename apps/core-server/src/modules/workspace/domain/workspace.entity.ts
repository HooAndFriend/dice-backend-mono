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
import WorkspaceUser from './workspace-user.entity';
import WorkspaceFunction from './workspace-function.entity';
import Team from '../../team/domain/team.entity';
import Epic from '../../ticket/domain/epic.entity';
import Ticket from '../../ticket/domain/ticket.entity';
import TicketSetting from '../../ticket/domain/ticket.setting.entity';
import Qa from '../../qa/domain/qa.entity';
import Board from '../../board/domain/board.entity';

@Entity({ name: 'TB_WORKSPACE' })
export default class Workspace extends BaseTimeEntity {
  @PrimaryGeneratedColumn()
  id: number;

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
    nullable: true,
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

  @OneToMany(() => WorkspaceUser, (workspaceUser) => workspaceUser.workspace, {
    cascade: true,
  })
  workspaceUser: Relation<WorkspaceUser>[];

  @OneToMany(
    () => WorkspaceFunction,
    (workspaceFunction) => workspaceFunction.workspace,
  )
  workspaceFunction: Relation<WorkspaceFunction>[];

  @OneToMany(() => Qa, (qa) => qa.workspace)
  qa: Relation<Qa>[];

  @OneToMany(() => Epic, (epic) => epic.workspace)
  epic: Relation<Epic>[];

  @OneToMany(() => Ticket, (ticket) => ticket.workspace)
  ticket: Relation<Ticket>[];

  @OneToMany(() => TicketSetting, (ticketSetting) => ticketSetting.workspace)
  ticketSetting: Relation<TicketSetting>[];

  @OneToMany(() => Board, (board) => board.workspace)
  board: Relation<Board>[];

  @ManyToOne(() => Team, (team) => team.workspace, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  team: Relation<Team>;
}
