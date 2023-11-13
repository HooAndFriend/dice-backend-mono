// ** Typeorm Imports
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm';

// ** enum, dto, entity Imports
import BaseTimeEntity from '../../../common/entity/BaseTime.Entity';
import Workspace from '../../workspace/domain/workspace.entity';
import User from '../../user/domain/user.entity';

@Entity({ name: 'TB_Table' })
export default class Table extends BaseTimeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Workspace, (workspace) => workspace.erd)
  workspase: Relation<Workspace>;

  @ManyToOne(() => User, (user) => user.erd)
  create_user: Relation<User>;

  @ManyToOne(() => User, (user) => user.erd)
  modify_user: Relation<User>;

  @Column({
    type: 'varchar',
    length: 50,
    name: 'name',
    comment: '테이블 이름',
    nullable: false,
  })
  name: string;

  @Column({
    type: 'varchar',
    length: 50,
    name: 'comment',
    comment: '코멘트',
    nullable: true,
  })
  comment: string;
}
