import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { TEAM_ROLE_KEY } from './team-role.decorator';
import TeamUserRepository from '@/src/modules/team-user/repository/team-user.repository';
import RoleEnum from '../../enum/Role';

@Injectable()
export class TeamRoleGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly teamUserRepository: TeamUserRepository,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRole = this.reflector.getAllAndOverride<string>(
      TEAM_ROLE_KEY,
      [context.getHandler(), context.getClass()],
    );

    const { user, headers } = context.switchToHttp().getRequest();
    const teamCode = headers['team-code'];

    if (teamCode === 'personal') {
      headers['team'] = { id: 0 };
      headers['team-user'] = user;

      return true;
    }

    const teamUser = await this.teamUserRepository.findOne({
      where: { team: { uuid: teamCode }, user: { id: user.id } },
      relations: ['team', 'user'],
    });

    if (!teamUser) return false;

    headers['team'] = teamUser.team;
    headers['team-user'] = teamUser;

    if (requiredRole === RoleEnum.ADMIN) {
      return teamUser.role === requiredRole;
    }

    if (requiredRole === RoleEnum.WRITER) {
      return teamUser.role === requiredRole || teamUser.role === RoleEnum.ADMIN;
    }

    if (requiredRole === RoleEnum.VIEWER) {
      return (
        teamUser.role === requiredRole ||
        teamUser.role === RoleEnum.ADMIN ||
        teamUser.role === RoleEnum.WRITER
      );
    }
  }
}
