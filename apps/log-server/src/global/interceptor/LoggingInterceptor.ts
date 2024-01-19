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
import { ClientProxy } from '@nestjs/microservices';
import RequestLogDto from '@/src/modules/request-log/dto/request-log.dto';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(@Inject('RMQ_SERVICE') private readonly rmqClient: ClientProxy) {}

  private logger = new Logger();
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<any> | Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    this.logger.log(
      `${request.method} : ${request.url} ${JSON.stringify(
        request.query,
      )} ${JSON.stringify(request.body)}`,
    );

    return next.handle().pipe(
      tap({
        next: (response: CommonResponseType) => {
          this.logger.log(`${response.statusCode} : ${response.message}`);
          this.rmqClient
            .send<RequestLogDto>(
              { cmd: 'request-log' },
              {
                requestUrl: request.url,
                requestBody: request.body,
                requestMethod: request.method,
                responseBody: response,
                serverName: 'log-server',
                userId: request.user ? request.user.email : '',
                ip: request.ip,
              },
            )
            .toPromise()
            .catch((err) => {
              console.log(err);
            });
        },
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        error: (error: Error) => {},
      }),
    );
  }
}
