// ** Typeorm Imports
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm';

// ** enum, dto, entity Imports
import BaseTimeEntity from '../../../global/domain/BaseTime.Entity';
import CsCategory from './cs-category.entity';

@Entity({ name: 'TB_FAQ' })
export default class Faq extends BaseTimeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 100,
    comment: '질문',
    nullable: false,
  })
  question: string;

  @Column({
    type: 'text',
    comment: '답변',
    nullable: false,
  })
  answer: string;

  @Column({
    type: 'varchar',
    length: 120,
    comment: '생성자 ID',
    nullable: false,
  })
  createdId: string;

  @Column({
    type: 'varchar',
    length: 50,
    comment: '수정자 ID',
    nullable: false,
  })
  modifiedId: string;

  @Column({
    type: 'boolean',
    comment: '사용 여부',
    name: 'is_enabled',
    nullable: false,
  })
  isEnabled: boolean;

  @ManyToOne(() => CsCategory, (csCategory) => csCategory.faq, {
    onDelete: 'CASCADE',
  })
  csCategory: Relation<CsCategory>;
}
