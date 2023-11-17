// ** Typeorm Imports
import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm';

// ** enum, dto, entity Imports
import BaseTimeEntity from '../../../common/entity/BaseTime.Entity';
import WorkspaceUser from '../../../api/workspace-user/domain/workspace-user.entity';
import Collection from '../../../api/collection/domain/collection.entity';
import Api from '../../../api/api/domain/api.entity';
import Table from '../../erd/domain/table.entity';

@Entity({ name: 'TB_WORKSPACE' })
export default class Workspace extends BaseTimeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 50,
    comment: '워크스페이스 이름',
    nullable: false,
  })
  name: string;

  @Column({
    type: 'text',
    comment: '워크스페이스 설명',
    nullable: false,
  })
  comment: string;

  @Column({
    type: 'varchar',
    length: 255,
    comment: '워크스페이스 프로필 이미지',
    nullable: true,
  })
  profile: string;

  @Column({
    type: 'boolean',
    comment: '개인 워크스페이스 여부',
    nullable: false,
  })
  isPersonal: boolean;

  @OneToMany(() => WorkspaceUser, (workspaceUser) => workspaceUser.workspace)
  workspaceUser: Relation<WorkspaceUser>[];

  @OneToMany(() => Table, (table) => table.workspace)
  table: Relation<Table>[];

  @OneToMany(() => Collection, (collection) => collection.workspace)
  collection: Relation<Collection>[];

  @OneToMany(() => Api, (api) => api.workspace)
  api: Relation<Api>[];
}
