// ** Typeorm Imports
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm';

// ** enum, dto, entity Imports
import BaseTimeEntity from '@/src/global/domain/BaseTime.Entity';
import RequestQaUpdateDto from '../dto/qa.update.dto';
import Comment from '@/src/modules/qa/domain/comment.entity';
import File from '@/src/modules/qa/domain/file.entity';
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
    type: 'varchar',
    length: 50,
    comment: '제목',
    nullable: false,
  })
  title: string;

  @Column({
    type: 'date',
    comment: '마감일',
    nullable: true,
    name: 'due_date',
  })
  dueDate: Date;

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

  @Column({
    type: 'boolean',
    comment: '삭제 여부',
    nullable: false,
    default: false,
  })
  isDeleted: boolean;

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

  updateQaFromDto(dto: RequestQaUpdateDto, user: User, file: File[]): void {
    const { title, asIs, toBe, memo } = dto;
    this.title = title;
    this.asIs = asIs;
    this.toBe = toBe;
    this.memo = memo;
    this.worker = user;
    this.file = file;
  }
}
