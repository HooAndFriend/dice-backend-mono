// ** Nest Imports
import { Controller } from '@nestjs/common';

// ** Swagger Imports
import { ApiResponse, ApiTags } from '@nestjs/swagger';

// ** Dto Imports

// ** Response Imports
import {
  createServerExceptionResponse,
  createUnauthorizedResponse,
} from '../../../response/common';

// ** Custom Module Imports
import ApiService from '../service/api.service';

@ApiTags('Workspace Api')
@ApiResponse(createServerExceptionResponse())
@ApiResponse(createUnauthorizedResponse())
@Controller({ path: '/workspace/api', version: '1' })
export default class ApiController {
  constructor(private readonly apiService: ApiService) {}
}
