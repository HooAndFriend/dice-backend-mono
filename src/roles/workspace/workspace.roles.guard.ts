import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { ROLES_KEY } from './workspace.roles.decorator';

@Injectable()
export class WorkspaceRolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRole = this.reflector.getAllAndOverride<string>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    const request = context.switchToHttp().getRequest();

    console.log(request.user);
    console.log(request.headers['dice-worker']);

    if (!requiredRole) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();
    return requiredRole === user.role;
  }
}
