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
import User from '../../user/domain/user.entity';
import Ticket from './ticket.entity';

@Entity({ name: 'TB_EPIC' })
export default class Epic extends BaseTimeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 30,
    name: 'name',
    comment: '에픽 명',
    nullable: false,
  })
  name: string;

  @Column({
    type: 'varchar',
    length: 30,
    name: 'code',
    comment: '에픽 코드',
    nullable: false,
  })
  code: string;

  @Column({
    type: 'int',
    comment: '정렬 순서',
    nullable: false,
    default: 1,
  })
  orderId: number;

  @ManyToOne(() => Workspace, (workspace) => workspace.epic, {
    onDelete: 'CASCADE',
  })
  workspace: Relation<Workspace>;

  @ManyToOne(() => User, (user) => user.epic, {
    onDelete: 'CASCADE',
  })
  admin: Relation<User>;

  @OneToMany(() => Ticket, (ticket) => ticket.epic)
  ticket: Relation<Ticket>[];
}
