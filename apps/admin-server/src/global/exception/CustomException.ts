import {
  BadRequestException as BadRequest,
  ForbiddenException,
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

export class WorkspaceForbiddenException extends ForbiddenException {
  constructor(message: string) {
    super(message);
  }
}

export class InternalServerErrorException extends Error {
  constructor(message: string) {
    super(message);
  }
}
