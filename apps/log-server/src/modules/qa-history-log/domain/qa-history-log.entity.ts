// ** Typeorm Imports
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

// ** enum, dto, entity Imports
import { BaseCreatedTimeEntity } from '@hi-dice/common';
import QaHistoryTypeEnum from './qa-history-log-type.enum';

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
    length: 50,
    comment: '변경한 유저 닉네임',
    nullable: false,
  })
  username: string;

  @Column({
    type: 'varchar',
    length: 50,
    comment: '보조 유저 닉네임',
    name: 'sub_username',
    nullable: true,
  })
  subUsername: string;

  @Column({
    type: 'enum',
    comment: 'QA 변경 이력 종류',
    enum: QaHistoryTypeEnum,
    nullable: false,
  })
  type: QaHistoryTypeEnum;

  @Column({
    type: 'text',
    comment: '변경 후',
    nullable: true,
  })
  after: string;

  @Column({
    type: 'text',
    comment: '변경 전',
    nullable: true,
  })
  before: string;

  @Column({
    type: 'text',
    comment: '기록 내용',
    nullable: true,
  })
  log: string;
}
