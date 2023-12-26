// ** Nest Imports
import { Body, Controller } from '@nestjs/common';

// ** Module Imports
import WorkspaceFunctionService from '../service/workspace-function.service';

// ** Swagger Imports
import { ApiResponse, ApiTags } from '@nestjs/swagger';

// ** Response Imports
import {
  createServerExceptionResponse,
  createUnauthorizedResponse,
} from '../../../response/common';

@ApiTags('Workspace Function')
@ApiResponse(createServerExceptionResponse())
@ApiResponse(createUnauthorizedResponse())
@Controller({ path: '/workspace-function', version: '1' })
export default class WorkspaceFunctionController {
  constructor(
    private readonly workspaceFunctionService: WorkspaceFunctionService,
  ) {}
}
