// ** Nest Imports
import { Injectable, ConsoleLogger } from '@nestjs/common';

@Injectable()
export default class LoggerService extends ConsoleLogger {
  debug(message: any, ...optionalParams: any[]) {
    super.debug(message, ...optionalParams);
  }

  warn(message: any, ...optionalParams: any[]) {
    super.warn(message, ...optionalParams);
  }

  log(message: any, ...optionalParams: any[]) {
    super.log(message, ...optionalParams);
  }

  error(message: any, ...optionalParams: any[]) {
    super.error(message, ...optionalParams);
  }
}
