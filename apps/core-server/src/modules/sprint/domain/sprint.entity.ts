// ** Typeorm Imports
import {
    Column,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    Relation,
  } from 'typeorm';
  
  // ** enum, dto, entity Imports
  import { BaseTimeEntity } from '@repo/common';
import Ticket from '../../ticket/domain/ticket.entity';
  
  @Entity({ name: 'TB_SPRINT' })
  export default class Sprint extends BaseTimeEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'varchar',
        length: 30,
        comment: '스프린트 이름',
        nullable: false,
    })
    name: string;

    @Column({
        type: 'date',
        name: 'start_date',
        comment: '시작일',
        nullable: false,
    })
    startDate: Date;

    @Column({
        type: 'date',
        name: 'end_date',
        comment: '마감일',
        nullable: false,
    })
    endDate: Date;

    @Column({
        type: 'int',
        comment: '정렬 순서',
        nullable: false,
    })
    orderId: number;

    @OneToMany(() => Ticket, (ticket) => ticket.id, { nullable: true })
    ticket: Relation<Ticket>[];
  }
  