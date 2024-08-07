// ** Nest Imports
import { Controller } from '@nestjs/common';

// ** Module Imports
import EpicService from '../service/epic.service';

// ** Swagger Imports
import { ApiResponse, ApiTags } from '@nestjs/swagger';

// ** Response Imports
import {
  createServerExceptionResponse,
  createUnauthorizedResponse,
} from '@/src/global/response/common';

// ** Dto Imports

@ApiTags('Workspace Epic')
@ApiResponse(createServerExceptionResponse())
@ApiResponse(createUnauthorizedResponse())
@Controller({ path: '/epic', version: '1' })
export default class EpicController {
  constructor(private readonly epicService: EpicService) {}
}
