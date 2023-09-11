import {
  HttpException,
  HttpStatus,
  BadRequestException as BadException,
  NotFoundException,
} from '@nestjs/common';

export class BadRequestException extends NotFoundException {
  constructor(message: string) {
    super(message);
  }
}

export class InternalServerErrorException extends HttpException {
  constructor(message: string) {
    super(message, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
