// ** Nest Imports
import { Body, Controller, Post, UseGuards } from '@nestjs/common';

// ** Module Imports
import TeamService from '../service/team.service';

// ** Swagger Imports
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

// ** Utils Imports
import JwtAccessGuard from '../../auth/passport/auth.jwt-access.guard';
import { GetUser } from '@/src/common/decorators/user.decorators';

// ** Response Imports
import {
  createServerExceptionResponse,
  createUnauthorizedResponse,
} from '../../../response/common';
import { TeamResponse } from '@/src/response/team.response';

// ** Dto Imports
import RequestTeamSaveDto from '../dto/team.save.dto';
import User from '../../user/domain/user.entity';

@ApiTags('Team')
@ApiResponse(createServerExceptionResponse())
@ApiResponse(createUnauthorizedResponse())
@Controller({ path: '/team', version: '1' })
export default class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: '팀 생성' })
  @ApiBody({ type: RequestTeamSaveDto })
  @ApiResponse(TeamResponse.saveTeam[200])
  @ApiResponse(TeamResponse.saveTeam[400])
  @UseGuards(JwtAccessGuard)
  @Post('/')
  public async saveTeam(
    @Body() dto: RequestTeamSaveDto,
    @GetUser() user: User,
  ) {
    return await this.teamService.saveTeam(user, dto);
  }
}
