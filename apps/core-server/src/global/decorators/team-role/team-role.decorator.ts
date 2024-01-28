// ** Nest Imports
import {
  ExecutionContext,
  SetMetadata,
  createParamDecorator,
} from '@nestjs/common';
import RoleEnum from '../../enum/Role';
import Team from '@/src/modules/team/domain/team.entity';

export const TEAM_ROLE_KEY = 'team-role';
export const TeamRole = (role: RoleEnum) => SetMetadata(TEAM_ROLE_KEY, role);

export const GetTeam = createParamDecorator(
  (data, ctx: ExecutionContext): Team => {
    const request = ctx.switchToHttp().getRequest();
    return request.headers.team;
  },
);
