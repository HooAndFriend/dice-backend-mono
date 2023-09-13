import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  Logger,
  HttpException,
} from '@nestjs/common';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private logger = new Logger();

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const { method, originalUrl } = request;
    const { name, message } = exception;

    this.logger.error('===== ERROR =====');
    this.logger.error(`${method} : ${originalUrl}`);

    if (request.body) {
      this.logger.error(`Request Body : ${JSON.stringify(request.body)}`);
    }

    if (request.query) {
      this.logger.error(`Request Query : ${JSON.stringify(request.query)}`);
    }

    if (exception instanceof HttpException) {
      this.logger.error(`[${exception.getStatus()}] ${message}`);

      response.status(exception?.getStatus() || 400).json({
        statusCode: exception?.getStatus() || 400,
        error: name,
        message,
      });

      return;
    }

    response.status(500).json({
      statusCode: 500,
      error: name,
      message,
    });
  }
}
