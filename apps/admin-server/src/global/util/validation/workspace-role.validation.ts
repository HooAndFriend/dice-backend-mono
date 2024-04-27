import { RoleEnum } from '@repo/common';
import { WorkspaceForbiddenException } from '@repo/common';

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
