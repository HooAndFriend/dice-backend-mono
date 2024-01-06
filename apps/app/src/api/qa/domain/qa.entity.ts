// ** Typeorm Imports
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, Relation } from 'typeorm';

// ** enum, dto, entity Imports
import BaseTimeEntity from '@/src/common/entity/BaseTime.Entity';
import Comment from '@/src/api/qa/domain/comment.entity'
import File from '@/src/api/qa/domain/file.entity'
import User from '../../user/domain/user.entity';
import Workspace from '../../workspace/domain/workspace.entity';

@Entity({ name: 'TB_QA' })
export default class Qa extends BaseTimeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 30,
    comment: '이슈 번호',
    nullable: false,
  })
  number: string;

  @Column({
    type: 'varchar',
    length: 50,
    comment: '제목',
    nullable: false,
  })
  title: string;

  @Column({
    type: 'text',
    comment: '문제 사항',
    nullable: false,
  })
  asIs: string;

  @Column({
    type: 'text',
    comment: '기대 결과',
    nullable: false,
  })
  toBe: string;

  @Column({
    type: 'text',
    comment: '메모',
    nullable: true,
  })
  memo: string;

  @OneToMany(() => Comment, (comment) => comment.qa)
  comment: Relation<Comment>[];

  @OneToMany(() => File, (file) => file.qa)
  qaFile: Relation<File>[];

  @ManyToOne(() => User, (user) => user.qa)
  admin: Relation<User>;

  @ManyToOne(() => User, (user) => user.qa)
  worker: Relation<User>;

  @ManyToOne(() => Workspace, (workspace) => workspace.workspaceFunction)
  workspace: Relation<Workspace>;
}
