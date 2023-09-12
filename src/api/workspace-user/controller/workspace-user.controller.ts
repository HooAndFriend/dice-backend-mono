// ** Nest Imports
import { Controller } from '@nestjs/common';

// ** Module Imports
import WorkspaceUserService from '../service/workspace-user.service';

// ** Swagger Imports
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Workspace User')
@Controller('workspace/user')
export default class WorkspaceUserController {
  constructor(private readonly workspaceUserService: WorkspaceUserService) {}
}
