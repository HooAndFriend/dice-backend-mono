// ** Typeorm Imports
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm';

// ** enum, dto, entity Imports
import { BaseTimeEntity } from '@hi-dice/common';
import BoardContent from './board-content.entity';

@Entity({ name: 'TB_BOARD_BLOCK' })
export default class BoardBlock extends BaseTimeEntity {
  @PrimaryColumn({
    type: 'varchar',
    length: 255,
    comment: '블럭 ID',
    nullable: false,
  })
  blockId: string;

  @Column({
    type: 'varchar',
    length: 255,
    comment: '블럭 타입',
    nullable: false,
  })
  type: string;

  @Column({
    type: 'text',
    comment: '콘텐츠',
    nullable: true,
  })
  data: string;

  @ManyToOne(() => BoardContent, (content) => content.blocks, {
    onDelete: 'CASCADE',
  })
  content: Relation<BoardContent>;
}
