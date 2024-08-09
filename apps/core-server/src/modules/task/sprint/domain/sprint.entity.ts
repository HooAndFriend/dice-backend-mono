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
import Ticket from '../../ticket/domain/ticket.entity';
import Workspace from '@/src/modules/workspace/domain/workspace.entity';
import { SprintStatusEnum } from '../enum/sprint.enum';

@Entity({ name: 'TB_SPRINT' })
export default class Sprint extends BaseTimeEntity {
  @PrimaryGeneratedColumn()
  sprintId: number;

  @Column({
    type: 'varchar',
    length: 30,
    name: 'title',
    comment: '스프린트 이름',
    nullable: false,
  })
  title: string;

  @Column({
    type: 'date',
    name: 'start_date',
    comment: '시작 날짜',
    nullable: true,
  })
  startDate: Date;

  @Column({
    type: 'date',
    name: 'end_date',
    comment: '마감 날짜',
    nullable: true,
  })
  endDate: Date;

  @Column({
    type: 'varchar',
    length: 100,
    name: 'description',
    comment: '설명',
    nullable: true,
  })
  description: string;

  @Column({
    type: 'enum',
    enum: SprintStatusEnum,
    name: 'status',
    comment: '상태',
    nullable: true,
  })
  status: SprintStatusEnum;

  @Column({
    type: 'int',
    comment: '정렬 순서',
    nullable: false,
    default: 1,
  })
  orderId: number;

  @ManyToOne(() => Workspace, (workspace) => workspace.sprint, {
    onDelete: 'CASCADE',
  })
  workspace: Relation<Workspace>;

  @OneToMany(() => Ticket, (ticket) => ticket.sprint)
  ticket: Relation<Ticket>[];
}
