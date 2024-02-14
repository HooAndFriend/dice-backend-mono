// ** Nest Imports
import {
  Controller,
  Get,
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

@ApiTags('Team')
@ApiResponse(createServerExceptionResponse())
@ApiResponse(createUnauthorizedResponse())
@Controller({ path: '/team', version: '1' })
export default class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: '팀 리스트 조회' })
  @ApiResponse(TeamResponse.findTeamList[200])
  @UseGuards(JwtAccessGuard)
  @Get('/')
  public async findUserList(@Query(ValidationPipe) dto: RequestTeamFindDto) {
    const data = await this.teamService.findTeamList(dto);

    return CommonResponse.createResponse({
      data: { data, count: data.length },
      statusCode: 200,
      message: '팀 리스트를 조회합니다.',
    });
  }
}
