import { Module } from '@nestjs/common';
import RequestLogModule from './request-log/request-log.module';

@Module({
  imports: [RequestLogModule],
  providers: [],
  exports: [],
  controllers: [],
})
export default class LogModule {}
