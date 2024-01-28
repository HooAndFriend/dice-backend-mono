import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './team-role.decorator';
import TeamUserRepository from '@/src/modules/team-user/repository/team-user.repository';

@Injectable()
export class TeamRolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly teamUserRepository: TeamUserRepository,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRole = this.reflector.getAllAndOverride<string>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    const { user, headers } = context.switchToHttp().getRequest();
    const teamCode = headers['team-code'];

    const teamUser = await this.teamUserRepository.findOne({
      where: { team: { uuid: teamCode }, user: { id: user.id } },
    });

    if (!teamUser) return false;

    return teamUser.role === requiredRole;
  }
}
