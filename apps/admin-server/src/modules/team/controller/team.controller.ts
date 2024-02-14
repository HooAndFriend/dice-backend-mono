// ** Nest Imports
import {
  Controller,
  Get,
  Param,
  Query,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';

// ** Module Imports
import TeamService from '../service/team.service';

// ** Swagger Imports
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

// ** Response Imports
import {
  createServerExceptionResponse,
  createUnauthorizedResponse,
} from '../../../global/response/common';
import { TeamResponse } from '@/src/global/response/team.response';

// ** Utils Imports
import JwtAccessGuard from '../../auth/passport/auth.jwt-access.guard';

// ** Dto Imports
import RequestTeamFindDto from '../dto/user.find.dto';
import CommonResponse from '@/src/global/dto/api.response';
import WorkspaceService from '../../workspace/service/workspace.service';

@ApiTags('Team')
@ApiResponse(createServerExceptionResponse())
@ApiResponse(createUnauthorizedResponse())
@Controller({ path: '/team', version: '1' })
export default class TeamController {
  constructor(
    private readonly teamService: TeamService,
    private readonly workspaceService: WorkspaceService,
  ) {}

  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: '팀 리스트 조회' })
  @ApiResponse(TeamResponse.findTeamList[200])
  @UseGuards(JwtAccessGuard)
  @Get('/')
  public async findTeamList(@Query(ValidationPipe) dto: RequestTeamFindDto) {
    const data = await this.teamService.findTeamList(dto);

    return CommonResponse.createResponse({
      data: { data, count: data.length },
      statusCode: 200,
      message: '팀 리스트를 조회합니다.',
    });
  }

  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: '팀 조회' })
  @ApiResponse(TeamResponse.findTeam[200])
  @ApiResponse(TeamResponse.findTeam[404])
  @UseGuards(JwtAccessGuard)
  @Get('/:id')
  public async findTeam(@Param('id') id: number) {
    const data = await this.teamService.findTeam(id);

    return CommonResponse.createResponse({
      data,
      statusCode: 200,
      message: '팀을 조회합니다.',
    });
  }

  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: '팀의 워크스페이스 리스트 조회' })
  @ApiResponse(TeamResponse.findWorkspaceListByTeamId[200])
  @UseGuards(JwtAccessGuard)
  @Get('/workspace/:id')
  public async findWorkspaceListByTeamId(@Param('id') id: number) {
    const [data, count] = await this.workspaceService.findWOrksapceListByTeamId(
      id,
    );

    return CommonResponse.createResponse({
      data: { data, count },
      statusCode: 200,
      message: '팀의 워크스페이스 리스트를 조회합니다.',
    });
  }
}
