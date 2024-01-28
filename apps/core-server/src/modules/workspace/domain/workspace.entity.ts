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
import WorkspaceUser from '../../workspace-user/domain/workspace-user.entity';
import WorkspaceFunction from '../../workspace-function/domain/workspace-function.entity';
import User from '../../user/domain/user.entity';
import Team from '../../team/domain/team.entity';
import Epic from '../../ticket/domain/epic.entity';
import Ticket from '../../ticket/domain/ticket.entity';
import TicketSetting from '../../ticket/domain/ticket.setting.entity';

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

  @OneToMany(() => WorkspaceUser, (workspaceUser) => workspaceUser.workspace, {
    cascade: true,
  })
  workspaceUser: Relation<WorkspaceUser>[];

  @OneToMany(
    () => WorkspaceFunction,
    (workspaceFunction) => workspaceFunction.workspace,
  )
  workspaceFunction: Relation<WorkspaceFunction>[];

  @OneToMany(() => Epic, (epic) => epic.workspace)
  epic: Relation<Epic>[];

  @OneToMany(() => Ticket, (ticket) => ticket.workspace)
  ticket: Relation<Ticket>[];

  @OneToMany(() => TicketSetting, (ticketSetting) => ticketSetting.workspace)
  ticketSetting: Relation<TicketSetting>[];

  @ManyToOne(() => User, (user) => user.workspace, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  user: Relation<User>;

  @ManyToOne(() => Team, (team) => team.workspace, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  team: Relation<Team>;
}
