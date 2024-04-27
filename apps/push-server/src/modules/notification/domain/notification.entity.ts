// ** Typeorm Imports
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

// ** enum, dto, entity Imports
import NotificationStatusEnum from './notification-status.enum';
import NotificationTypeEnum from './notification-type.enum';
import { BaseTimeEntity } from '@repo/common';

@Entity({ name: 'TB_NOTIFICATION' })
export default class Notification extends BaseTimeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 120,
    comment: '이메일',
    nullable: false,
  })
  email: string;

  @Column({
    type: 'varchar',
    length: 100,
    comment: '제목',
    nullable: false,
  })
  title: string;

  @Column({
    type: 'text',
    comment: '내용',
    nullable: false,
  })
  body: string;

  @Column({
    type: 'enum',
    enum: NotificationStatusEnum,
    comment: '상태',
    nullable: false,
  })
  status: NotificationStatusEnum;

  @Column({
    type: 'enum',
    enum: NotificationTypeEnum,
    comment: '종류',
    nullable: false,
  })
  type: NotificationTypeEnum;

  @Column({
    type: 'int',
    comment: '보조 데이터',
    name: 'sub_id',
    nullable: true,
  })
  subId: number;
}
