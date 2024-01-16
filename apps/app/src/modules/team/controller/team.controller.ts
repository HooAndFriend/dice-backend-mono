// ** Nest Imports
import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';

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
import { GetUser } from '@/src/global/decorators/user/user.decorators';

// ** Response Imports
import {
  createServerExceptionResponse,
  createUnauthorizedResponse,
} from '../../../global/response/common';
import { TeamResponse } from '@/src/global/response/team.response';

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

  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: '팀 조회' })
  @ApiResponse(TeamResponse.findTeam[200])
  @ApiResponse(TeamResponse.findTeam[404])
  @UseGuards(JwtAccessGuard)
  @Get('/:id')
  public async findTeam(@Param('id') teamId: number) {
    return await this.teamService.findTeam(teamId);
  }
}
