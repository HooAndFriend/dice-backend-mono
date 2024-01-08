// ** Typeorm Imports
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm';

// ** enum, dto, entity Imports
import BaseTimeEntity from '../../../common/entity/BaseTime.Entity';
import Workspace from '../../workspace/domain/workspace.entity';
import User from '../../user/domain/user.entity';

@Entity({ name: 'TB_EPIC' })
export default class Epic extends BaseTimeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 30,
    name: 'name',
    comment: '에픽 명',
    nullable: false,
  })
  name: string;

  @Column({
    type: 'varchar',
    length: 30,
    name: 'code',
    comment: '에픽 코드',
    nullable: false,
  })
  code: string;

  @ManyToOne(() => Workspace, (workspace) => workspace.epic)
  workspace: Relation<Workspace>;

  @ManyToOne(() => User, (user) => user.epic)
  admin: Relation<User>;
}
