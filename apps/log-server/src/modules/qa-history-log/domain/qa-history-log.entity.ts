// ** Typeorm Imports
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

// ** enum, dto, entity Imports
import { BaseCreatedTimeEntity, QaHistoryTypeEnum } from '@hi-dice/common';

@Entity({ name: 'TB_QA_HISTORY_LOG' })
export default class QaHistoryLog extends BaseCreatedTimeEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({
    comment: 'QA ID',
    name: 'qa_id',
    nullable: false,
  })
  qaId: number;

  @Column({
    type: 'varchar',
    length: 120,
    comment: '이메일',
    nullable: false,
  })
  email: string;

  @Column({
    type: 'enum',
    comment: 'QA 변경 이력 종류',
    enum: QaHistoryTypeEnum,
    nullable: false,
  })
  type: QaHistoryTypeEnum;

  @Column({
    type: 'text',
    comment: '기록 내용',
    nullable: true,
  })
  log: string;
}
