import { RoleEnum } from '@hi-dice/common';
import { WorkspaceForbiddenException } from '@hi-dice/common';

export const validationWorkspaceAdminRole = (role: RoleEnum) => {
  if (role !== RoleEnum.ADMIN) {
    throw new WorkspaceForbiddenException("You don't have admin permission.");
  }
};

export const validationWorkspaceWriterRole = (role: RoleEnum) => {
  if (role === RoleEnum.VIEWER) {
    throw new WorkspaceForbiddenException("You don't have writer permission.");
  }
};
