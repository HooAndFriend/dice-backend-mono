import { NotFoundException as NotFound } from '@nestjs/common';

export class NotFoundException extends NotFound {
  constructor(message: string) {
    super(message);
  }
}
