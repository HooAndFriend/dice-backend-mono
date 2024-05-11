// ** Nest Imports
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';

// ** Utils Imports
import { decryptUtil } from '../../util/aes';

@Injectable()
export class InternalGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly configService: ConfigService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const { headers } = context.switchToHttp().getRequest();

    const internalCode = headers['internal-code'];

    return (
      decryptUtil(internalCode) ===
      this.configService.get<string>('INTERNAL_API_KEY')
    );
  }
}
