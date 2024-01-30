// ** Nest Imports
import { Controller } from '@nestjs/common';

// ** Module Imports
import TeamUserService from '../service/team-user.service';

// ** Swagger Imports
import { ApiResponse, ApiTags } from '@nestjs/swagger';

// ** Response Imports
import {
  createServerExceptionResponse,
  createUnauthorizedResponse,
} from '../../../global/response/common';

// ** Utils Imports

// ** Dto, Entity Imports

@ApiTags('Team User')
@ApiResponse(createServerExceptionResponse())
@ApiResponse(createUnauthorizedResponse())
@Controller({ path: '/team-user', version: '1' })
export default class TeamUserController {
  constructor(private readonly teamUserService: TeamUserService) {}
}
