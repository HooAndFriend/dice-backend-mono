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
import BaseTimeEntity from '../../../common/entity/BaseTime.Entity';
import Workspace from '../../../api/workspace/domain/workspace.entity';
import { ApiType } from '../../../common/enum/ApiType.enum';
import User from '../../user/domain/user.entity';
import { AuthorizationType } from '../../../common/enum/AuthorizationType.enum';
import Collection from '../../collection/domain/collection.entity';

@Entity({ name: 'TB_WORKSPACE_API' })
export default class Api extends BaseTimeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 50,
    comment: 'api 이름',
    nullable: true,
    default: 'New Request',
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
  endpoint: string;

  @Column({
    type: 'enum',
    enum: AuthorizationType,
    comment: 'auth 종류',
    nullable: true,
  })
  authtype: AuthorizationType;

  @Column({
    type: 'varchar',
    length: 50,
    comment: 'key값',
    nullable: true,
  })
  headerkey: string;

  @Column({
    type: 'varchar',
    length: 255,
    comment: 'value값',
    nullable: true,
  })
  headervalue: string;

  @Column({
    type: 'text',
    comment: '설명값',
    nullable: true,
  })
  headerdiscreption: Text;

  @Column({
    type: 'enum',
    enum: ApiType,
    comment: 'body 종류',
    nullable: false,
  })
  bodytype: ApiType;

  @ManyToOne(() => Collection, (collection) => collection.api)
  collection: Relation<Collection>;

  @ManyToOne(() => User, (user) => user.api)
  createdUser: Relation<User>;

  @ManyToOne(() => User, (user) => user.api)
  modifiedUser: Relation<User>;
}
