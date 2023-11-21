// ** Nest Imports
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';

// ** Type Imports
import type { CommonResponseType } from '../types';

// ** Utils Imports
import { isEmpty } from 'loadsh';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private logger = new Logger();
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<any> | Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    this.logger.log(`${request.method} : ${request.url}`);

    if (!isEmpty(request.body)) {
      this.logger.log(request.body);
    }

    if (!isEmpty(request.query)) {
      this.logger.log(1, request.query);
    }

    return next.handle().pipe(
      tap({
        next: (response: CommonResponseType) => {
          this.logger.log(`${response.statusCode} : ${response.message}`);
        },
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        error: (error: Error) => {},
      }),
    );
  }
}
