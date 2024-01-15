import { Module } from '@nestjs/common';

import AuthModule from './auth/auth.module';
import UserModule from './user/user.module';
import WorkspaceModule from './workspace/workspace.module';
import WorkspaceUserModule from './workspace-user/workspace-user.module';
import CollectionModule from './collection/collection.module';
import DiagramModule from './diagram/diagram.module';
import TeamModule from './team/team.module';
import TeamUserModule from './team-user/team-user.module';
import WorkspaceFunctionModule from './workspace-function/workspace-function.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    WorkspaceModule,
    WorkspaceUserModule,
    WorkspaceFunctionModule,
    CollectionModule,
    DiagramModule,
    TeamModule,
    TeamUserModule,
  ],
  providers: [],
  exports: [],
  controllers: [],
})
export default class ApiModule {}
