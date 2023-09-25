// ** Nest Imports
import { SetMetadata } from '@nestjs/common';
import { WorkspaceRoleType } from 'src/common/enum/WorkspaceRoleType.enum';

export const ROLES_KEY = 'WORKSPACE_ROLES';
export const WorkspaceRole = (role: WorkspaceRoleType) =>
  SetMetadata(ROLES_KEY, role);
