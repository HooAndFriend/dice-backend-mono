// ** Nest Imports
import {
  CallHandler,
  ExecutionContext,
  Inject,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';

// ** Type Imports
import type { CommonResponseType } from '../types';

// ** Utils Imports
import { parse } from 'url';
import { ClientProxy } from '@nestjs/microservices';
import { RequestLogDto } from '@hi-dice/common';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(@Inject('RMQ_LOG_QUE') private readonly rmqClient: ClientProxy) {}

  private logger = new Logger(LoggingInterceptor.name);
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<any> | Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    const { pathname } = parse(request.url);

    this.logger.log(
      `${request.method} : ${pathname} ${JSON.stringify(
        request.query,
      )} ${JSON.stringify(request.body)} ${this.getInfo(request)}`,
    );

    return next.handle().pipe(
      tap({
        next: (response: CommonResponseType) => {
          this.logger.log(`${response.statusCode} : ${response.message}`);
          this.rmqClient
            .emit<RequestLogDto>('request-log', {
              requestUrl: pathname,
              requestBody: request.body,
              requestParams: request.query,
              requestMethod: request.method,
              responseBody: response,
              serverName: 'core-server',
              userId: request.user ? request.user.email : '',
              ip: request.ip,
            })
            .toPromise()
            .catch((err) => {
              Logger.log(err);
            });
        },
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        error: (error: Error) => {},
      }),
    );
  }

  private getInfo(request) {
    const log = {};
    if (request?.user) {
      log['email'] = request?.user?.email;
      log['userId'] = request?.user?.userId;
    }

    if (request?.headers['workspace-code']) {
      const workspaceCode = request.headers['workspace-code'];
      log['workspaceCode'] = workspaceCode;
    }

    return JSON.stringify(log);
  }
}
