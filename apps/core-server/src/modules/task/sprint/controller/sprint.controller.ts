// ** Nest Imports
import { Controller } from '@nestjs/common';

// ** Module Imports
import SprintService from '../service/sprint.service';

// ** Swagger Imports
import { ApiResponse, ApiTags } from '@nestjs/swagger';

// ** Response Imports
import {
  createServerExceptionResponse,
  createUnauthorizedResponse,
} from '@/src/global/response/common';

@ApiTags('Ticket Sprint')
@ApiResponse(createServerExceptionResponse())
@ApiResponse(createUnauthorizedResponse())
@Controller({ path: '/ticket/sprint', version: '1' })
export default class SprintController {
  constructor(private readonly sprintService: SprintService) {}
}
