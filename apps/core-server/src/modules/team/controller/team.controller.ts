// ** Nest Imports
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';

// ** Module Imports
import TeamService from '../service/team.service';

// ** Swagger Imports
import {
  ApiBearerAuth,
  ApiBody,
  ApiHeader,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

// ** Utils Imports
import JwtAccessGuard from '../../auth/passport/auth.jwt-access.guard';
import { GetUser } from '@/src/global/decorators/user/user.decorators';
import { TeamRoleGuard } from '@/src/global/decorators/team-role/team-role.guard';
import {
  GetTeam,
  TeamRole,
} from '@/src/global/decorators/team-role/team-role.decorator';

// ** Response Imports
import {
  createServerExceptionResponse,
  createUnauthorizedResponse,
} from '../../../global/response/common';
import { TeamResponse } from '@/src/global/response/team.response';

// ** Dto Imports
import RequestTeamSaveDto from '../dto/team.save.dto';
import User from '../../user/domain/user.entity';
import { CommonResponse } from '@hi-dice/common';
import { RoleEnum } from '@hi-dice/common';
import Team from '../domain/team.entity';
import RequestTeamUpdateDto from '../dto/team.update.dto';

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
    await this.teamService.saveTeam(user, dto);

    return CommonResponse.createResponseMessage({
      statusCode: 200,
      message: '팀을 생성합니다.',
    });
  }

  @ApiBearerAuth('access-token')
  @ApiHeader({ name: 'team-code', required: true })
  @ApiOperation({ summary: '팀 수정' })
  @ApiBody({ type: RequestTeamUpdateDto })
  @ApiResponse(TeamResponse.updateTeam[200])
  @ApiResponse(TeamResponse.updateTeam[400])
  @ApiResponse(TeamResponse.updateTeam[404])
  @TeamRole(RoleEnum.ADMIN)
  @UseGuards(TeamRoleGuard)
  @UseGuards(JwtAccessGuard)
  @Put('/')
  public async updateTeam(
    @Body() dto: RequestTeamUpdateDto,
    @GetTeam() { id, name }: Team,
  ) {
    await this.teamService.updateTeam(id, dto);

    return CommonResponse.createResponseMessage({
      statusCode: 200,
      message: '팀을 수정 합니다.',
    });
  }

  @ApiBearerAuth('access-token')
  @ApiHeader({ name: 'team-code', required: true })
  @ApiOperation({ summary: '팀 조회' })
  @ApiResponse(TeamResponse.findTeam[200])
  @ApiResponse(TeamResponse.findTeam[404])
  @TeamRole(RoleEnum.VIEWER)
  @UseGuards(TeamRoleGuard)
  @UseGuards(JwtAccessGuard)
  @Get('/')
  public async findTeam(@GetTeam() { id }: Team) {
    const team = await this.teamService.findTeam(id);

    return CommonResponse.createResponse({
      data: team,
      statusCode: 200,
      message: 'Find Team',
    });
  }
}
