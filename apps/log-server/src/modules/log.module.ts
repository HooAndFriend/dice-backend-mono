import { Module } from '@nestjs/common';
import RequestLogModule from './request-log/request-log.module';
import QaHistoryLogModule from './qa-history-log/qa-history-log.module';

@Module({
  imports: [RequestLogModule, QaHistoryLogModule],
  providers: [],
  exports: [],
  controllers: [],
})
export default class LogModule {}
