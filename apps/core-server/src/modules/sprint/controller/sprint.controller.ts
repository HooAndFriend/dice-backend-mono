// ** Nest Imports
import {
  Controller,
} from '@nestjs/common';

// ** Module Imports

// ** Swagger Imports
import {
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

// ** Utils Imports

// ** Response Imports
import {
  createServerExceptionResponse,
  createUnauthorizedResponse,
} from '../../../global/response/common';

// ** Dto Imports

// ** Entity Imports

// ** Emum Imports

@ApiTags('SPRINT')
@ApiResponse(createServerExceptionResponse())
@ApiResponse(createUnauthorizedResponse())
@Controller({ path: '/sprint', version: '1' })
export default class SprintController {
  constructor(
  ) {}
}
