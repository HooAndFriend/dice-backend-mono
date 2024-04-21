// ** Typeorm Imports
import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm';

// ** enum, dto, entity Imports
import BaseTimeEntity from '../../../global/domain/BaseTime.Entity';
import Faq from './faq.entity';
import Qna from './qna.entity';

@Entity({ name: 'TB_CS_CATEGORY' })
export default class CsCategory extends BaseTimeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 100,
    comment: '카테고리 이름',
    nullable: false,
  })
  name: string;

  @OneToMany(() => Faq, (faq) => faq.csCategory)
  faq: Relation<Faq>[];

  @OneToMany(() => Qna, (qna) => qna.csCategory)
  qna: Relation<Qna>[];
}
