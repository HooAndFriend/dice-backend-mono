import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class InternalGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const { headers } = context.switchToHttp().getRequest();

    const internalCode = headers['internal-code'];

    return internalCode === 'HI-DICE';
  }
}
