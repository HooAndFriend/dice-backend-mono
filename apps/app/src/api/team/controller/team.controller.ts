// ** Nest Imports
import { Controller } from '@nestjs/common';

// ** Module Imports
import TeamService from '../service/team.service';

// ** Swagger Imports
import { ApiResponse, ApiTags } from '@nestjs/swagger';

// ** Response Imports
import {
  createServerExceptionResponse,
  createUnauthorizedResponse,
} from '../../../response/common';

@ApiTags('Team')
@ApiResponse(createServerExceptionResponse())
@ApiResponse(createUnauthorizedResponse())
@Controller({ path: '/team', version: '1' })
export default class TeamController {
  constructor(private readonly teamService: TeamService) {}
}
