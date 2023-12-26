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
import WorkspaceUser from '../../workspace-user/domain/workspace-user.entity';
import Collection from '../../collection/domain/collection.entity';
import Api from '../../request/domain/request.entity';
import Diagram from '../../diagram/domain/diagram.entity';

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

  @OneToMany(() => Diagram, (diagram) => diagram.workspace)
  diagram: Relation<Diagram>[];

  @OneToMany(() => Collection, (collection) => collection.workspace)
  collection: Relation<Collection>[];
}
