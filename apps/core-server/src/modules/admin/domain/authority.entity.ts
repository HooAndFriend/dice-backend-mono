// ** Typeorm Imports
import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';

// ** enum, dto, entity Imports
import { BaseTimeEntity } from '@hi-dice/common';
import AdminRoleEnum from './admin-role.enum';

@Entity({ name: 'TB_AUTHORITY' })
@Unique(['name', 'role'])
export default class Authority extends BaseTimeEntity {
  @PrimaryGeneratedColumn()
  authorityId: number;

  @Column({
    type: 'varchar',
    length: 50,
    comment: '이름',
    nullable: false,
  })
  name: string;

  @Column({
    type: 'enum',
    enum: AdminRoleEnum,
    comment: '관리자 권한',
    nullable: false,
  })
  role: AdminRoleEnum;

  @Column({
    type: 'boolean',
    comment: '대시보드 권한',
    name: 'dashboard_yn',
    nullable: false,
  })
  dashboardYn: boolean;

  @Column({
    type: 'boolean',
    comment: '사용자 권한',
    name: 'user_yn',
    nullable: false,
  })
  userYn: boolean;

  @Column({
    type: 'boolean',
    comment: '탈퇴 사용자 권한',
    name: 'inactive_user_yn',
    nullable: false,
  })
  inactiveUserYn: boolean;

  @Column({
    type: 'boolean',
    comment: '팀 권한',
    name: 'team_yn',
    nullable: false,
  })
  teamYn: boolean;

  @Column({
    type: 'boolean',
    comment: '워크스페이스 권한',
    name: 'workspace_yn',
    nullable: false,
  })
  workspaceYn: boolean;

  @Column({
    type: 'boolean',
    comment: 'QNA 권한',
    name: 'qna_yn',
    nullable: false,
  })
  qnaYn: boolean;

  @Column({
    type: 'boolean',
    comment: 'FAQ 권한',
    name: 'faq_yn',
    nullable: false,
  })
  faqYn: boolean;

  @Column({
    type: 'boolean',
    comment: '프로그램 버전 권한',
    name: 'program_yn',
    nullable: false,
  })
  programYn: boolean;

  @Column({
    type: 'boolean',
    comment: '상태값 관리 권한',
    name: 'state_yn',
    nullable: false,
  })
  stateYn: boolean;

  @Column({
    type: 'boolean',
    comment: '관리자 조회 권한',
    name: 'admin_yn',
    nullable: false,
  })
  adminYn: boolean;
}
