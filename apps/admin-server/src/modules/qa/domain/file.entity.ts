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
import BaseCreatedTimeEntity from '@/src/global/domain/BaseCreatedTime.entity';

@Entity({ name: 'TB_QA_FILE' })
export default class File extends BaseCreatedTimeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 255,
    comment: '파일 URL',
    nullable: false,
  })
  url: string;

  @ManyToOne(() => Qa, (qa) => qa.file, {
    onDelete: 'CASCADE',
    orphanedRowAction: 'delete',
  })
  qa: Relation<Qa>;
}
