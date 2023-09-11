// ** Nest Imports
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Logger } from '@nestjs/common';

// ** Express Imports
import { Request, Response, NextFunction } from 'express';

@Injectable()
export default class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger();

  use(request: Request, response: Response, next: NextFunction) {
    const { ip, method, originalUrl } = request;
    const userAgent = request.get('user-agent') || '';

    request.on('close', () => {
      const contentLength = response.get('content-length');

      this.logger.log(`${method} : ${originalUrl}`);
      this.logger.log(`${ip} : ${userAgent} - ${contentLength}`);

      if (request.body) {
        this.logger.log(`Request Body : ${JSON.stringify(request.body)}`);
      }

      if (request.query) {
        this.logger.log(`Request Query : ${JSON.stringify(request.query)}`);
      }
    });

    next();
  }
}
