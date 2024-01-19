// ** Typeorm Imports
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

// ** enum, dto, entity Imports
import BaseTimeEntity from '@/src/global/domain/BaseTime.Entity';

@Entity({ name: 'TB_REQUEST_LOG' })
export default class RequestLog extends BaseTimeEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({
    type: 'varchar',
    length: 30,
    comment: '서버 이름',
    name: 'server_name',
    nullable: false,
  })
  serverName: string;

  @Column({
    type: 'varchar',
    length: 30,
    comment: 'IP',
    name: 'ip',
    nullable: false,
  })
  ip: string;

  @Column({
    type: 'varchar',
    length: 50,
    comment: '유저 ID',
    name: 'user_id',
    nullable: false,
  })
  userId: string;

  @Column({
    type: 'varchar',
    length: 100,
    comment: '요청 URL',
    name: 'request_url',
    nullable: false,
  })
  requestUrl: string;

  @Column({
    type: 'varchar',
    length: 10,
    comment: '요청 Method',
    name: 'request_method',
    nullable: false,
  })
  requestMethod: string;

  @Column({
    type: 'text',
    comment: '요청 바디',
    name: 'request_body',
    nullable: false,
  })
  requestBody: string;

  @Column({
    type: 'text',
    comment: '응답 바디',
    name: 'response_body',
    nullable: false,
  })
  responseBody: string;
}
