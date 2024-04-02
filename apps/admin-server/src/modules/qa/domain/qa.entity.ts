// ** Typeorm Imports
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm';

// ** enum, dto, entity Imports
import BaseTimeEntity from '@/src/global/domain/BaseTime.Entity';
import Comment from '@/src/modules/qa/domain/qa.comment.entity';
import File from '@/src/modules/qa/domain/qa.file.entity';
import User from '../../user/domain/user.entity';
import Workspace from '../../workspace/domain/workspace.entity';
import { TaskStatusEnum } from '@/src/global/enum/TaskStatus.enum';

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
  code: string;

  @Column({
    type: 'enum',
    enum: TaskStatusEnum,
    comment: '상태',
    nullable: false,
    default: TaskStatusEnum.NOTHING,
  })
  status: TaskStatusEnum;

  @Column({
    type: 'date',
    name: 'complete_date',
    comment: 'complete date',
    nullable: true,
  })
  completeDate: Date;

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

  @OneToMany(() => File, (file) => file.qa, { nullable: true })
  file: Relation<File>[];

  @ManyToOne(() => User, (user) => user.qa)
  admin: Relation<User>;

  @ManyToOne(() => User, (user) => user.qa)
  worker: Relation<User>;

  @ManyToOne(() => Workspace, (workspace) => workspace.workspaceFunction)
  workspace: Relation<Workspace>;
}
