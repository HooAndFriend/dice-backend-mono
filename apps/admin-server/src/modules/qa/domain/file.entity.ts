// ** Typeorm Imports
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm';

// ** enum, dto, entity Imports
import Qa from '@/src/modules/qa/domain/qa.entity';

@Entity({ name: 'TB_QA_FILE' })
export default class File {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 255,
    comment: '파일 URL',
    nullable: false,
  })
  url: string;

  @CreateDateColumn({ name: 'created_date' })
  createdDate: Date;

  @ManyToOne(() => Qa, (qa) => qa.file, {
    onDelete: 'CASCADE',
    orphanedRowAction: 'delete',
  })
  qa: Relation<Qa>;
}
