import {
  BadRequestException,
  InternalServerErrorException,
  NotFoundException,
  WorkspaceForbiddenException,
} from '@hi-dice/common';
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  UnauthorizedException,
} from '@nestjs/common';

@Catch()
export class CustomExceptionFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    const { name, message } = exception;

    if (exception instanceof NotFoundException) {
      return response.status(exception.getStatus()).json({
        statusCode: exception.getStatus(),
        error: name,
        message,
      });
    }

    if (exception instanceof BadRequestException) {
      return response.status(exception.getStatus()).json({
        statusCode: exception.getStatus(),
        error: name,
        message,
      });
    }

    if (exception instanceof WorkspaceForbiddenException) {
      return response.status(exception.getStatus()).json({
        statusCode: exception.getStatus(),
        error: name,
        message,
      });
    }

    if (exception instanceof UnauthorizedException) {
      return response.status(exception.getStatus()).json({
        statusCode: exception.getStatus(),
        error: name,
        message,
      });
    }

    if (exception instanceof HttpException) {
      return response.status(exception.getStatus()).json({
        statusCode: exception.getStatus(),
        error: name,
        message,
      });
    }

    response.status(500).json({
      statusCode: 500,
      error: name,
      message,
    });
  }
}
