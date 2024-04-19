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

  @ManyToOne((type) => Board, (board) => board.children)
  parent: Board;

  @OneToMany((type) => Board, (board) => board.parent)
  children: Board[];

  @ManyToOne(() => Workspace, (workspace) => workspace.board, {
    onDelete: 'CASCADE',
  })
  workspace: Relation<Workspace>;
}
