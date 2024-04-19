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
import BaseTimeEntity from '../../../global/domain/BaseTime.Entity';
import Workspace from '../../workspace/domain/workspace.entity';

@Entity({ name: 'TB_BOARD' })
export default class Board extends BaseTimeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 255,
    comment: '게시글 이름',
    nullable: false,
  })
  title: string;

  @Column({
    type: 'varchar',
    length: 120,
    comment: '생성자 ID',
    nullable: false,
  })
  createdId: string;

  @Column({
    type: 'varchar',
    length: 120,
    comment: '수정자 ID',
    nullable: false,
  })
  modifiedId: string;

  @Column({
    type: 'int',
    comment: '정렬 순서',
    nullable: false,
  })
  orderId: number;

  @Column({
    type: 'boolean',
    comment: '삭제 여부',
    nullable: false,
    default: false,
  })
  isDeleted: boolean;

  @ManyToOne((type) => Board, (board) => board.children, {
    onDelete: 'CASCADE',
  })
  parent: Board;

  @OneToMany((type) => Board, (board) => board.parent, { cascade: true })
  children: Board[];

  @ManyToOne(() => Workspace, (workspace) => workspace.board, {
    onDelete: 'CASCADE',
  })
  workspace: Relation<Workspace>;
}
