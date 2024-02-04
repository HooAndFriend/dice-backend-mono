// ** Nest Imports
import { Controller } from '@nestjs/common';

// ** Module Imports
import WorkspaceUserService from '../service/workspace-user.service';

// ** Swagger Imports
import { ApiResponse, ApiTags } from '@nestjs/swagger';

// ** Response Imports

import {
  createServerExceptionResponse,
  createUnauthorizedResponse,
} from '../../../global/response/common';

@ApiTags('Workspace User')
@ApiResponse(createServerExceptionResponse())
@ApiResponse(createUnauthorizedResponse())
@Controller({ path: '/workspace-user', version: '1' })
export default class WorkspaceUserController {
  constructor(private readonly workspaceUserService: WorkspaceUserService) {}
}
