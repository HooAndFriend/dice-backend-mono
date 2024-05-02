// ** Typeorm Imports
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm';

// ** enum, dto, entity Imports
import Qa from '@/src/modules/qa/domain/qa.entity';
import { BaseCreatedTimeEntity } from '@hi-dice/common';

@Entity({ name: 'TB_QA_FILE' })
export default class QaFile extends BaseCreatedTimeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 255,
    comment: '파일 URL',
    nullable: false,
  })
  url: string;

  @ManyToOne(() => Qa, (qa) => qa.qaFile, {
    onDelete: 'CASCADE',
    orphanedRowAction: 'delete',
  })
  qa: Relation<Qa>;
}
