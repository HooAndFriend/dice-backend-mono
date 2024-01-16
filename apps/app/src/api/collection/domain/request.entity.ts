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
import { ApiType } from '../../../common/enum/ApiType.enum';
import { AuthorizationType } from '../../../common/enum/AuthorizationType.enum';
import Collection from './collection.entity';
import { BodyType } from '../../../common/enum/BodyType.enum';

@Entity({ name: 'TB_WORKSPACE_REQUEST' })
export default class Request extends BaseTimeEntity {
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
    default: ApiType.GET,
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
    enum: BodyType,
    comment: 'body 종류',
    nullable: true,
  })
  bodytype: BodyType = null;

  @Column({
    type: 'varchar',
    length: 255,
    comment: 'raw data',
    nullable: true,
  })
  rawdata: string;

  @Column({
    type: 'varchar',
    length: 255,
    comment: 'form data key',
    nullable: true,
  })
  formdatakey: string;

  @Column({
    type: 'varchar',
    length: 255,
    comment: 'form data value',
    nullable: true,
  })
  formdatavalue: string;

  @Column({
    type: 'varchar',
    length: 255,
    comment: 'param key값',
    nullable: true,
  })
  paramkey: string;

  @Column({
    type: 'varchar',
    length: 255,
    comment: 'param value값',
    nullable: true,
  })
  paramvalue: string;

  @ManyToOne(() => Collection, (collection) => collection.request, {
    onDelete: 'CASCADE',
  })
  collection: Relation<Collection>;
}
