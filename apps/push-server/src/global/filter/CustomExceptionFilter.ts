import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  Logger,
  HttpException,
} from '@nestjs/common';

@Catch()
export class CustomExceptionFilter implements ExceptionFilter {
  private logger = new Logger(CustomExceptionFilter.name);

  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const { name, message } = exception;

    this.logger.error(`[${exception.name}] : ${exception.message}`);

    if (exception instanceof HttpException) {
      response.status(exception.getStatus()).json({
        statusCode: exception.getStatus(),
        error: name,
        message,
      });

      return;
    }

    this.logger.error(exception);

    response.status(500).json({
      statusCode: 500,
      error: name,
      message,
    });
  }
}
