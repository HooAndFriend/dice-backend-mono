// ** Typeorm Imports
import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm';

// ** enum, dto, entity Imports
import { BaseTimeEntity } from '@hi-dice/common';
import Faq from '../../faq/domain/faq.entity';
import Qna from '../../qna/domain/qna.entity';

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

  @OneToMany(() => Faq, (faq) => faq.csCategory)
  faq: Relation<Faq>[];

  @OneToMany(() => Qna, (qna) => qna.csCategory)
  qna: Relation<Qna>[];
}
