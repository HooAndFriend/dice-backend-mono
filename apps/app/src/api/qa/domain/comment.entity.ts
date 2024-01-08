// ** Typeorm Imports
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, Relation } from 'typeorm';

// ** enum, dto, entity Imports
import BaseTimeEntity from '../../../common/entity/BaseTime.Entity';
import Qa from '@/src/api/qa/domain/qa.entity';
import User from '../../user/domain/user.entity';

@Entity({ name: 'TB_COMMENT' })
export default class Comment extends BaseTimeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'text',
    comment: '댓글 내용',
    nullable: false,
  })
  content: string;

  @ManyToOne(() => Qa, (qa) => qa.comment, {onDelete: 'CASCADE'})
  qa: Relation<Qa>;

  @ManyToOne(() => User, (user) => user.comment)
  user: Relation<User>;
}
