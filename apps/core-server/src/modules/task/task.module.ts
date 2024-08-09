// ** Nest Imports
import { Module, forwardRef } from '@nestjs/common';

// ** Custom Module Imports
import SprintModule from './sprint/sprint.module';
import WorkspaceModule from '../workspace/workspace.module';
import TicketModule from './ticket/ticket.module';
import TicketCommentModule from './ticket-comment/ticket-comment.module';
import UserModule from '../user/user.module';
import TicketFileModule from './ticket-file/ticket-file.module';
import TicketSettingModule from './ticket-setting/ticket-setting.module';
import EpicModule from './epic/epic.module';

@Module({
  imports: [
    forwardRef(() => WorkspaceModule),
    forwardRef(() => UserModule),
    forwardRef(() => SprintModule),
    forwardRef(() => TicketModule),
    forwardRef(() => TicketCommentModule),
    forwardRef(() => TicketFileModule),
    forwardRef(() => TicketSettingModule),
    forwardRef(() => EpicModule),
  ],
  exports: [],
  controllers: [],
  providers: [],
})
export default class TaskModule {}
