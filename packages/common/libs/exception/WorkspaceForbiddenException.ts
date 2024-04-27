import { ForbiddenException } from '@nestjs/common';

export class WorkspaceForbiddenException extends ForbiddenException {
  constructor(message: string) {
    super(message);
  }
}
