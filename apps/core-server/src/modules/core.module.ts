import { Module } from '@nestjs/common';

import AuthModule from './auth/auth.module';
import UserModule from './user/user.module';
import WorkspaceModule from './workspace/workspace.module';
import TeamModule from './team/team.module';
import QaModule from './qa/qa.module';
import TicketModule from './ticket/ticket.module';
import CsModule from './cs/cs.module';
import AdminModule from './admin/admin.module';
import VersionModule from './version/version.module';
import StateModule from './state/state.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    WorkspaceModule,
    TeamModule,
    QaModule,
    TicketModule,
    CsModule,
    AdminModule,
    VersionModule,
    StateModule,
  ],
  providers: [],
  exports: [],
  controllers: [],
})
export default class CoreModule {}
