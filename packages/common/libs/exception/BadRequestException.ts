import { BadRequestException as BadRequest } from '@nestjs/common';

export class BadRequestException extends BadRequest {
  constructor(message: string) {
    super(message);
  }
}
