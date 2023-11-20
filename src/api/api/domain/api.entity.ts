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
import Workspace from '../../../api/workspace/domain/workspace.entity';
import { ApiType } from '../../../common/enum/apiType.enum';
import User from '../../user/domain/user.entity';

@Entity({ name: 'TB_WORKSPACE_API' })
export default class Api extends BaseTimeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Workspace, (workspace) => workspace.table)
  @Column({
    type: 'varchar',
    length: 50,
    comment: 'api 이름',
    nullable: true,
  })
  name: string;

  @Column({
    type: 'enum',
    enum: ApiType,
    comment: 'api 종류',
    nullable: false,
  })
  type: ApiType;

  @Column({
    type: 'varchar',
    length: 150,
    comment: 'api 경로',
    nullable: true,
  })
  endpoint: String;

  @ManyToOne(() => Workspace, (workspace) => workspace.table)
  workspace: Relation<Workspace>;

  @ManyToOne(() => User, (user) => user.api)
  createdUser: Relation<User>;

  @ManyToOne(() => User, (user) => user.api)
  modifiedUser: Relation<User>;
}
