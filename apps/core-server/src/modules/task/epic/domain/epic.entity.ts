// ** Typeorm Imports
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm';

// ** enum, dto, entity Imports
import { BaseTimeEntity } from '@hi-dice/common';
import Workspace from '@/src/modules/workspace/domain/workspace.entity';
import Ticket from '../../ticket/domain/ticket.entity';

@Entity({ name: 'TB_EPIC' })
export default class Epic extends BaseTimeEntity {
  @PrimaryGeneratedColumn()
  epicId: number;

  @Column({
    type: 'varchar',
    length: 30,
    name: 'name',
    comment: '에픽 명',
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
    type: 'varchar',
    length: 30,
    name: 'code',
    comment: '에픽 코드',
    nullable: false,
  })
  code: string;

  @Column({
    type: 'text',
    comment: '에픽 내용',
    nullable: false,
  })
  content: string;

  @Column({
    type: 'boolean',
    comment: '삭제 여부',
    nullable: false,
    default: false,
  })
  isDeleted: boolean;

  @ManyToOne(() => Workspace, (workspace) => workspace.epic, {
    onDelete: 'CASCADE',
  })
  workspace: Relation<Workspace>;

  @OneToMany(() => Ticket, (ticket) => ticket.epic)
  ticket: Relation<Ticket>[];
}
