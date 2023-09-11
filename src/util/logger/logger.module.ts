// ** Nest Imports
import { Module } from '@nestjs/common';

// ** Custom Module Imports
import LoggerService from './logger.service';
import LoggerMiddleware from './logger.middleware';

@Module({
  providers: [LoggerService, LoggerMiddleware],
})
export default class LoggerModule {}
