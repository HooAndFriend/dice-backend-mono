// ** Nest Imports
import { Injectable, ConsoleLogger } from '@nestjs/common';
import { ClsService } from 'nestjs-cls';

@Injectable()
export default class LoggerService extends ConsoleLogger {
  constructor(private readonly cls: ClsService) {
    super();
  }

  debug(message: any, ...optionalParams: any[]) {
    super.debug(`[${this.cls.getId()}] ${message}`, ...optionalParams);
  }

  warn(message: any, ...optionalParams: any[]) {
    super.warn(`[${this.cls.getId()}] ${message}`, ...optionalParams);
  }

  log(message: any, ...optionalParams: any[]) {
    super.log(`[${this.cls.getId()}] ${message}`, ...optionalParams);
  }

  error(message: any, ...optionalParams: any[]) {
    super.error(`[${this.cls.getId()}] ${message}`, ...optionalParams);
  }
}
