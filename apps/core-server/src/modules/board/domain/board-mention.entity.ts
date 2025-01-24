// ** Typeorm Imports
import {
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm';

// ** enum, dto, entity Imports
import { BaseTimeEntity } from '@hi-dice/common';
import BoardBlock from './board-block.entity';
import User from '../../user/domain/user.entity';

@Entity({ name: 'TB_BOARD_MENTION' })
export default class BoardMention extends BaseTimeEntity {
  @PrimaryGeneratedColumn()
  mentionId: number;

  @ManyToOne(() => BoardBlock, (block) => block.mentions, {
    onDelete: 'CASCADE',
  })
  block: Relation<BoardBlock>;

  @ManyToOne(() => User , (user) => user.mentions)
  mentioner: Relation<User>;

  @ManyToOne(() => User , (user) => user.mentions)
  mentionedUser: Relation<User>;
}
