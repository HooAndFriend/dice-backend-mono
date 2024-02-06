import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import User from '../../../modules/user/domain/user.entity';

export const GetAdmin = createParamDecorator(
  (data, ctx: ExecutionContext): User => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
