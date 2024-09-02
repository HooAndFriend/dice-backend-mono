// ** Typeorm Imports
import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';

// ** enum, dto, entity Imports
import { BaseTimeEntity } from '@hi-dice/common';
import AdminRoleEnum from './admin-role.enum';

@Entity({ name: 'TB_ADMIN' })
@Unique(['email', 'nickname'])
export default class Admin extends BaseTimeEntity {
  @PrimaryGeneratedColumn()
  adminId: number;

  @Column({
    type: 'varchar',
    length: 50,
    comment: '이메일',
    nullable: false,
  })
  email: string;

  @Column({
    type: 'varchar',
    length: 50,
    comment: '전화번호',
    nullable: false,
  })
  phone: string;

  @Column({
    type: 'varchar',
    length: 120,
    comment: '비밀번호',
    nullable: false,
  })
  password: string;

  @Column({
    type: 'enum',
    enum: AdminRoleEnum,
    comment: '관리자 권한',
    nullable: false,
  })
  role: AdminRoleEnum;

  @Column({
    type: 'varchar',
    length: 50,
    comment: '닉네임',
    nullable: false,
  })
  nickname: string;

  @Column({
    type: 'varchar',
    length: 255,
    comment: '프로필 이미지',
    nullable: false,
  })
  profile: string;

  @Column({
    type: 'varchar',
    length: 120,
    comment: '생성자 ID',
    nullable: false,
  })
  createdId: string;
}
