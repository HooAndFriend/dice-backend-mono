// ** Nest Imports
import { Module, forwardRef } from '@nestjs/common';

// ** Custom Module Imports
import UserModule from '../user/user.module';
import WorkspaceModule from '../workspace/workspace.module';
import RunnerController from './controller/runner.controller';
import RunnerService from './service/runner.service';
import BoardModule from '../board/board.module';
import TicketModule from '../task/ticket/ticket.module';
import TicketCommentModule from '../task/ticket-comment/ticket-comment.module';

@Module({
  imports: [
    forwardRef(() => UserModule),
    forwardRef(() => WorkspaceModule),
    forwardRef(() => TicketModule),
    forwardRef(() => TicketCommentModule),
    forwardRef(() => BoardModule),
  ],
  exports: [RunnerService],
  controllers: [RunnerController],
  providers: [RunnerService],
})
export default class RunnerModule {}
