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
import Qa from '@/src/modules/qa/domain/qa.entity';
import User from '../../user/domain/user.entity';

@Entity({ name: 'TB_QA_COMMENT' })
export default class QaComment extends BaseTimeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'text',
    comment: '댓글 내용',
    nullable: false,
  })
  content: string;

  @ManyToOne(() => Qa, (qa) => qa.comment, { onDelete: 'CASCADE' })
  qa: Relation<Qa>;

  @ManyToOne(() => User, (user) => user.comment, {
    onDelete: 'CASCADE',
  })
  user: Relation<User>;
}
