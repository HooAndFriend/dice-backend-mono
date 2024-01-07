// ** Nest Imports
import { Controller, Get, UseGuards } from '@nestjs/common';

// ** Module Imports
import TeamUserService from '../service/team-user.service';

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
} from '../../../response/common';
import { TeamUserResponse } from '@/src/response/team-user.response';

// ** Utils Imports
import JwtAccessGuard from '../../auth/passport/auth.jwt-access.guard';
import { GetUser } from '@/src/common/decorators/user.decorators';

// ** Dto, Entity Imports
import User from '../../user/domain/user.entity';

@ApiTags('Team User')
@ApiResponse(createServerExceptionResponse())
@ApiResponse(createUnauthorizedResponse())
@Controller({ path: '/team/user', version: '1' })
export default class TeamUserController {
  constructor(private readonly teamUserService: TeamUserService) {}

  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: '유저의 팀 리스트 조회' })
  @ApiResponse(TeamUserResponse.findTeamList[200])
  @UseGuards(JwtAccessGuard)
  @Get()
  public async findTeamList(@GetUser() { id }: User) {
    return await this.teamUserService.findTeamList(id);
  }
}
