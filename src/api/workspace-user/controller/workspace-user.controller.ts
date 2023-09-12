// ** Nest Imports
import { Controller } from '@nestjs/common';

// ** Module Imports
import WorkspaceService from '../service/workspace-user.service';

// ** Swagger Imports
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Workspace')
@Controller('workspace')
export default class WorkspaceController {
  constructor(private readonly workspaceService: WorkspaceService) {}
}
