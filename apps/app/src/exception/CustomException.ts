import {
  BadRequestException as BadRequest,
  NotFoundException as NotFound,
} from '@nestjs/common';

export class NotFoundException extends NotFound {
  constructor(message: string) {
    super(message);
  }
}

export class BadRequestException extends BadRequest {
  constructor(message: string) {
    super(message);
  }
}

export class InternalServerErrorException extends Error {
  constructor(message: string) {
    super(message);
  }
}
