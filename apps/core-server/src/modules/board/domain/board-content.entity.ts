// ** Typeorm Imports
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm';

// ** enum, dto, entity Imports
import { BaseTimeEntity } from '@hi-dice/common';
import Board from './board.entity';
import BoardBlock from './board-block.entity';

@Entity({ name: 'TB_BOARD_CONTENT' })
export default class BoardContent extends BaseTimeEntity {
  @PrimaryGeneratedColumn()
  contentId: number;

  @Column({
    type: 'bigint',
    comment: '시간',
    nullable: false,
  })
  time: number;

  @Column({
    type: 'varchar',
    length: 255,
    comment: '버전',
    nullable: false,
  })
  version: string;

  @OneToOne(() => Board, (board) => board.content)
  @JoinColumn({ name: 'boardId' })
  board: Relation<Board>;

  @OneToMany(() => BoardBlock, (block) => block.content, { cascade: true })
  blocks: Relation<BoardBlock>[];
}
