// ** Nest Imports
import { Controller } from '@nestjs/common';

// ** Module Imports
import WorkspaceFunctionService from '../service/workspace-function.service';

// ** Swagger Imports
import { ApiResponse, ApiTags } from '@nestjs/swagger';

// ** Response Imports
import {
  createServerExceptionResponse,
  createUnauthorizedResponse,
} from '../../../global/response/common';

@ApiTags('Workspace Function')
@ApiResponse(createServerExceptionResponse())
@ApiResponse(createUnauthorizedResponse())
@Controller({ path: '/workspace-function', version: '1' })
export default class WorkspaceFunctionController {
  constructor(
    private readonly workspaceFunctionService: WorkspaceFunctionService,
  ) {}
}
