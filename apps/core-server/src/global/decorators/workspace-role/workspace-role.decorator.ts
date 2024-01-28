// ** Nest Imports
import { SetMetadata } from '@nestjs/common';
import RoleEnum from '../../enum/Role';

export const WORKSPACE_ROLE_KEY = 'workspace-role';
export const WorkspaceRole = (role: RoleEnum) =>
  SetMetadata(WORKSPACE_ROLE_KEY, role);
