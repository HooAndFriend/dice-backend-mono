import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtPayload } from '../../types';

export const GetUser = createParamDecorator(
  (data, ctx: ExecutionContext): JwtPayload => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
