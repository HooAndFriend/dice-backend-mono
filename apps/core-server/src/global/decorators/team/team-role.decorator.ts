// ** Nest Imports
import { SetMetadata } from '@nestjs/common';
import RoleEnum from '../../enum/Role';

export const ROLES_KEY = 'team-roles';
export const TeamRole = (role: RoleEnum) => SetMetadata(ROLES_KEY, role);
