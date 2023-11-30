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
import Request from '../../request/domain/request.entity';

@Entity({ name: 'TB_WORKSPACE_COLLECTION' })
export default class Collection extends BaseTimeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 50,
    comment: 'collection 이름',
    nullable: true,
  })
  name: string;

  @ManyToOne(() => Workspace, (workspace) => workspace.collection)
  workspace: Relation<Workspace>;

  @OneToMany(() => Request, (request) => request.collection)
  request: Relation<Request>;
}
