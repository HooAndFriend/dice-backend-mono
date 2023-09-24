// ** Typeorm Imports
import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

// ** enum, dto, entity Imports
import BaseTimeEntity from 'src/common/entity/BaseTime.Entity';
import { UserType } from 'src/common/enum/UserType.enum';
import WorkspaceUser from 'src/api/workspace-user/domain/workspace-user.entity';

@Entity({ name: 'TB_USER' })
@Unique(['username', 'token'])
export default class User extends BaseTimeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 50,
    comment: '유저 id',
    nullable: true,
  })
  username: string;

  @Column({
    type: 'varchar',
    length: 120,
    comment: '비밀번호',
    nullable: true,
  })
  password: string;

  @Column({
    type: 'varchar',
    length: 150,
    comment: '소셜 토큰',
    nullable: true,
  })
  token: string;

  @Column({
    type: 'enum',
    enum: UserType,
    comment: '로그인 종류',
    nullable: false,
  })
  type: UserType;

  @Column({
    type: 'varchar',
    length: 50,
    comment: '닉네임',
    nullable: false,
  })
  nickname: string;

  @Column({
    type: 'text',
    comment: '워크스페이스 설명',
    nullable: false,
  })
  comment: string;

  @Column({
    type: 'varchar',
    length: 120,
    comment: '이메일',
    nullable: true,
  })
  email: string;

  @Column({
    type: 'varchar',
    length: 255,
    comment: '프로필 이미지',
    nullable: true,
  })
  profile: string;

  @Column({
    type: 'varchar',
    length: 255,
    comment: '링크',
    nullable: true,
  })
  link: string;

  @OneToMany(() => WorkspaceUser, (worksapceUser) => worksapceUser.user)
  workspaceUser: WorkspaceUser[];
}
