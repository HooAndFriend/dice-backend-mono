// ** Nest Imports
import { Module } from '@nestjs/common';

// ** Custom Module Imports
import RequestLogModule from './request-log/request-log.module';
import QaHistoryLogModule from './qa-history-log/qa-history-log.module';
import TicketHistoryLogModule from './ticket-history-log/ticket-history-log.module';
import FileDownloadLogModule from './file-download-log/file-download-log.module';
import AuthModule from './auth/auth.module';

@Module({
  imports: [
    AuthModule,
    RequestLogModule,
    QaHistoryLogModule,
    TicketHistoryLogModule,
    FileDownloadLogModule,
  ],
  providers: [],
  exports: [],
  controllers: [],
})
export default class LogModule {}
