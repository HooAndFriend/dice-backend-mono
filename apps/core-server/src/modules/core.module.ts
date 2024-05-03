// ** Nest Imports
import { Module } from '@nestjs/common';

// ** Custom Module Imports
import AuthModule from './auth/auth.module';
import UserModule from './user/user.module';
import WorkspaceModule from './workspace/workspace.module';
import TeamModule from './team/team.module';
import QaModule from './qa/qa.module';
import TicketModule from './ticket/ticket.module';
import CsModule from './cs/qna/qna.module';
import AdminModule from './admin/admin.module';
import VersionModule from './version/version.module';
import BoardModule from './board/board.module';
import InternalModule from './internal/internal.module';

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
    BoardModule,
    InternalModule,
  ],
  providers: [],
  exports: [],
  controllers: [],
})
export default class CoreModule {}
