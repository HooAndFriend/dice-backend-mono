// ** Nest Imports
import { Controller } from '@nestjs/common';

// ** Module Imports
import StateService from '../service/state.service';

// ** Swagger Imports
import { ApiResponse, ApiTags } from '@nestjs/swagger';

// ** Utils Imports

// ** Response Imports
import {
  createServerExceptionResponse,
  createUnauthorizedResponse,
} from '../../../global/response/common';

// ** Dto Imports

@ApiTags('State')
@ApiResponse(createServerExceptionResponse())
@ApiResponse(createUnauthorizedResponse())
@Controller({ path: '/state', version: '1' })
export default class StateController {
  constructor(private readonly stateService: StateService) {}
}
