// ** Nest Imports
import { Module } from '@nestjs/common';

// ** Custom Module Imports
import AuthModule from './auth/auth.module';
import UserModule from './user/user.module';
import WorkspaceModule from './workspace/workspace.module';
import TeamModule from './team/team.module';
import QaModule from './qa/qa.module';
import TicketModule from './ticket/ticket.module';
import CsModule from './cs/cs.module';
import AdminModule from './admin/admin.module';
import VersionModule from './version/version.module';
import BoardModule from './board/board.module';
import SprintModule from './sprint/sprint.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    WorkspaceModule,
    TeamModule,
    QaModule,
    SprintModule,
    TicketModule,
    CsModule,
    AdminModule,
    VersionModule,
    BoardModule,
  ],
  providers: [],
  exports: [],
  controllers: [],
})
export default class CoreModule {}
