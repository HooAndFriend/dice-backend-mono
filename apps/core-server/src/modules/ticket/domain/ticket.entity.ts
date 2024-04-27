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
import { BaseTimeEntity } from '@repo/common';
import Workspace from '../../workspace/domain/workspace.entity';
import User from '../../user/domain/user.entity';
import Epic from './epic.entity';
import TicketFile from './ticket.file.entity';
import TicketComment from './ticket.comment.entity';
import { TaskStatusEnum } from '@repo/common';
import TicketSetting from './ticket.setting.entity';

@Entity({ name: 'TB_TICKET' })
export default class Ticket extends BaseTimeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 50,
    name: 'name',
    comment: '티켓 명',
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

  @Column({
    type: 'enum',
    enum: TaskStatusEnum,
    name: 'status',
    comment: '상태',
    nullable: false,
  })
  status: TaskStatusEnum;

  @Column({
    type: 'text',
    name: 'content',
    comment: '티켓 내용',
    nullable: true,
  })
  content: string;

  @Column({
    type: 'varchar',
    length: 30,
    comment: '티켓 번호',
    nullable: false,
  })
  code: string;

  @Column({
    type: 'integer',
    name: 'storypoint',
    comment: 'storypoint',
    nullable: true,
  })
  storypoint: number;

  @Column({
    type: 'boolean',
    comment: '삭제 여부',
    nullable: false,
    default: false,
  })
  isDeleted: boolean;

  @Column({
    type: 'date',
    name: 'due_date',
    comment: 'due date',
    nullable: true,
  })
  dueDate: Date;

  @Column({
    type: 'date',
    name: 'complete_date',
    comment: 'complete date',
    nullable: true,
  })
  completeDate: Date;

  @Column({
    type: 'date',
    name: 'reopen_date',
    comment: 'reopen date',
    nullable: true,
  })
  reopenDate: Date;

  @ManyToOne(() => Workspace, (workspace) => workspace.ticket, {
    onDelete: 'CASCADE',
  })
  workspace: Relation<Workspace>;

  @ManyToOne(() => Epic, (epic) => epic.ticket, {
    onDelete: 'CASCADE',
  })
  epic: Relation<Epic>;

  @ManyToOne(() => User, (user) => user.ticket, {
    onDelete: 'CASCADE',
  })
  admin: Relation<User>;

  @ManyToOne(() => User, (user) => user.ticket, {
    onDelete: 'CASCADE',
  })
  worker: Relation<User>;

  @ManyToOne(() => TicketSetting, (ticketSetting) => ticketSetting.ticket, {
    onDelete: 'CASCADE',
  })
  ticketSetting: Relation<TicketSetting>;

  @OneToMany(() => TicketFile, (ticketFile) => ticketFile.ticket)
  ticketFile: Relation<TicketFile>[];

  @OneToMany(() => TicketComment, (comment) => comment.ticket)
  comment: Relation<TicketComment>[];
}
