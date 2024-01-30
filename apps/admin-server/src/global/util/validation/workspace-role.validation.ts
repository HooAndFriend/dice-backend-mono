import Role from '../../enum/Role';
import { WorkspaceForbiddenException } from '../../exception/CustomException';

export const validationWorkspaceAdminRole = (role: Role) => {
  if (role !== Role.ADMIN) {
    throw new WorkspaceForbiddenException("You don't have admin permission.");
  }
};

export const validationWorkspaceWriterRole = (role: Role) => {
  if (role === Role.VIEWER) {
    throw new WorkspaceForbiddenException("You don't have writer permission.");
  }
};
