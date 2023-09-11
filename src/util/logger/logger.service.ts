// ** Nest Imports
import { Injectable, LoggerService as NestLoggerService } from '@nestjs/common';

// ** Utils Imports
import * as dayjs from 'dayjs';

@Injectable()
export default class LoggerService implements NestLoggerService {
  debug(message: any, ...optionalParams: any[]) {
    console.debug(
      dayjs().format('YYYY-MM-DD HH:mm:ss'),
      '\x1b[36m[Debug]\x1b[0m',
      message,
      ...optionalParams,
    );
  }

  warn(message: any, ...optionalParams: any[]) {
    console.warn(
      dayjs().format('YYYY-MM-DD HH:mm:ss'),
      '\x1b[33m[Warning]\x1b[0m',
      message,
      ...optionalParams,
    );
  }

  log(message: any, ...optionalParams: any[]) {
    console.log(
      dayjs().format('YYYY-MM-DD HH:mm:ss'),
      '\x1b[32m[Log]\x1b[0m',
      message,
      ...optionalParams,
    );
  }

  error(message: any, ...optionalParams: any[]) {
    console.error(
      dayjs().format('YYYY-MM-DD HH:mm:ss'),
      '\x1b[31m[Error]\x1b[0m',
      message,
      ...optionalParams,
    );
  }
}
