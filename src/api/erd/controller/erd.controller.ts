// ** Nest Imports
import { Controller } from '@nestjs/common';

// ** Module Imports
import ErdService from '../service/erd.service';

// ** Swagger Imports
import { ApiResponse, ApiTags } from '@nestjs/swagger';

// ** Dto Imports

import {
  createServerExceptionResponse,
  createUnauthorizedResponse,
} from '../../../response/common';

@ApiTags('Workspace Erd')
@ApiResponse(createServerExceptionResponse())
@ApiResponse(createUnauthorizedResponse())
@Controller('/api/workspace/erd')
export default class ErdController {
  constructor(private readonly erdService: ErdService) {}
}
