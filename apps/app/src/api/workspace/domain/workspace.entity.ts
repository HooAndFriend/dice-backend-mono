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
import WorkspaceUser from '../../workspace-user/domain/workspace-user.entity';
import Collection from '../../collection/domain/collection.entity';
import Diagram from '../../diagram/domain/diagram.entity';
import WorkspaceFunction from '../../workspace-function/domain/workspace-function.entity';
import User from '../../user/domain/user.entity';
import Team from '../../team/domain/team.entity';

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

  @OneToMany(() => WorkspaceUser, (workspaceUser) => workspaceUser.workspace)
  workspaceUser: Relation<WorkspaceUser>[];

  @OneToMany(() => Diagram, (diagram) => diagram.workspace)
  diagram: Relation<Diagram>[];

  @OneToMany(() => Collection, (collection) => collection.workspace)
  collection: Relation<Collection>[];

  @OneToMany(
    () => WorkspaceFunction,
    (workspaceFunction) => workspaceFunction.workspace,
  )
  workspaceFunction: Relation<WorkspaceFunction>[];

  @ManyToOne(() => User, (user) => user.workspace, {
    nullable: true,
  })
  user: Relation<User>;

  @ManyToOne(() => Team, (team) => team.workspace, {
    nullable: true,
  })
  team: Relation<Team>;
}
