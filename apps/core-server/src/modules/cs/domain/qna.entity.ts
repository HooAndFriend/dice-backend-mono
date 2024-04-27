// ** Typeorm Imports
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm';

// ** enum, dto, entity Imports
import { BaseTimeEntity } from '@repo/common';
import CsCategory from './cs-category.entity';

@Entity({ name: 'TB_QNA' })
export default class Qna extends BaseTimeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 50,
    comment: '질문자 이름',
    nullable: false,
  })
  name: string;

  @Column({
    type: 'varchar',
    length: 120,
    comment: '질문자 이메일',
    nullable: false,
  })
  email: string;

  @Column({
    type: 'varchar',
    length: 50,
    comment: '제목',
    nullable: false,
  })
  title: string;

  @Column({
    type: 'text',
    comment: '내용',
    nullable: false,
  })
  text: string;

  @Column({
    type: 'varchar',
    length: 255,
    comment: '파일',
    nullable: true,
  })
  file: string;

  @Column({
    type: 'text',
    comment: '답변 내용',
    nullable: true,
  })
  answer: string;

  @Column({
    type: 'varchar',
    length: 120,
    comment: '답변자 ID',
    nullable: true,
  })
  answerId: string;

  @Column({
    type: 'datetime',
    comment: '답변 시간',
    name: 'answer_date',
    nullable: true,
  })
  answerDate: Date;

  @Column({
    type: 'boolean',
    comment: '답변 여부',
    name: 'is_answer',
    nullable: false,
  })
  isAnswer: boolean;

  @ManyToOne(() => CsCategory, (csCategory) => csCategory.qna, {
    onDelete: 'CASCADE',
  })
  csCategory: Relation<CsCategory>;
}
