// ** Nest Imports
import {
  ExecutionContext,
  SetMetadata,
  createParamDecorator,
} from '@nestjs/common';
import { RoleEnum } from '@repo/common';
import Workspace from '@/src/modules/workspace/domain/workspace.entity';

export const WORKSPACE_ROLE_KEY = 'workspace-role';
export const WorkspaceRole = (role: RoleEnum) =>
  SetMetadata(WORKSPACE_ROLE_KEY, role);

export const GetWorkspace = createParamDecorator(
  (data, ctx: ExecutionContext): Workspace => {
    const request = ctx.switchToHttp().getRequest();
    return request.headers.workspace;
  },
);
