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
import RequestQaUpdateDto from '../dto/qa.update.dto';
import Comment from '@/src/modules/qa/domain/comment.entity';
import File from '@/src/modules/qa/domain/file.entity';
import User from '../../user/domain/user.entity';
import Workspace from '../../workspace/domain/workspace.entity';
import { QaStatus } from '@/src/global/enum/QaStatus.enum';

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
    type: 'enum',
    enum: QaStatus,
    comment: '상태',
    nullable: false,
    default: QaStatus.NOTHING,
  })
  status: QaStatus;

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
