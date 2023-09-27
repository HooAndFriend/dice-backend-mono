// ** Nest Imports
import { Controller } from '@nestjs/common';

// ** Swagger Imports
import { ApiResponse, ApiTags } from '@nestjs/swagger';

// ** Dto Imports

// ** Response Imports
import {
  createServerExceptionResponse,
  createUnauthorizedResponse,
} from 'src/response/common';

// ** Custom Module Imports
import ApiService from '../service/api.service';

@ApiTags('Workspace Api')
@ApiResponse(createServerExceptionResponse())
@ApiResponse(createUnauthorizedResponse())
@Controller('/api/workspace/api')
export default class ApiController {
  constructor(private readonly apiService: ApiService) {}
}
