// ** Nest Imports
import { SetMetadata } from '@nestjs/common';
import RoleEnum from '../../enum/Role';

export const TEAM_ROLE_KEY = 'team-role';
export const TeamRole = (role: RoleEnum) => SetMetadata(TEAM_ROLE_KEY, role);
