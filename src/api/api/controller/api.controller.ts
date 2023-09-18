// ** Nest Imports
import { Controller } from '@nestjs/common';

// ** Module Imports
import ErdService from '../service/api.service';

// ** Swagger Imports
import { ApiResponse, ApiTags } from '@nestjs/swagger';

// ** Dto Imports

import {
  createServerExceptionResponse,
  createUnauthorizedResponse,
} from 'src/response/common';
import ApiService from '../service/api.service';

@ApiTags('Workspace Api')
@ApiResponse(createServerExceptionResponse())
@ApiResponse(createUnauthorizedResponse())
@Controller('/api/workspace/api')
export default class ApiController {
  constructor(private readonly apiService: ApiService) {}
}
