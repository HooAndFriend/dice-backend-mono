// ** Nest Imports
import { Controller } from '@nestjs/common';

// ** Module Imports
import WorkspaceService from '../service/workspace.service';

// ** Swagger Imports
import { ApiResponse, ApiTags } from '@nestjs/swagger';

// ** Utils Imports

// ** Response Imports

import {
  createServerExceptionResponse,
  createUnauthorizedResponse,
} from '../../../global/response/common';

@ApiTags('Workspace')
@ApiResponse(createServerExceptionResponse())
@ApiResponse(createUnauthorizedResponse())
@Controller({ path: '/workspace', version: '1' })
export default class WorkspaceController {
  constructor(private readonly workspaceService: WorkspaceService) {}
}
