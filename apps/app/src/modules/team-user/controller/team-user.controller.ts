// ** Nest Imports
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';

// ** Module Imports
import TeamUserService from '../service/team-user.service';

// ** Swagger Imports
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

// ** Response Imports
import {
  createServerExceptionResponse,
  createUnauthorizedResponse,
} from '../../../global/response/common';
import { TeamUserResponse } from '@/src/global/response/team-user.response';

// ** Utils Imports
import JwtAccessGuard from '../../auth/passport/auth.jwt-access.guard';
import { GetUser } from '@/src/global/decorators/user/user.decorators';

// ** Dto, Entity Imports
import User from '../../user/domain/user.entity';
import RequestTeamUserSaveDto from '../dto/team-user.save.dto';
import RequestTeamUserUpdateDto from '../dto/team-user.update.dto';

@ApiTags('Team User')
@ApiResponse(createServerExceptionResponse())
@ApiResponse(createUnauthorizedResponse())
@Controller({ path: '/team-user', version: '1' })
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

  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: '팀 유저 초대' })
  @ApiBody({ type: RequestTeamUserSaveDto })
  @ApiResponse(TeamUserResponse.inviteUser[200])
  @ApiResponse(TeamUserResponse.inviteUser[404])
  @UseGuards(JwtAccessGuard)
  @Post()
  public async saveTeamUser(@Body() dto: RequestTeamUserSaveDto) {
    return await this.teamUserService.saveTeamUser(dto);
  }

  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: '팀 유저 삭제' })
  @ApiResponse(TeamUserResponse.deleteUser[200])
  @ApiResponse(TeamUserResponse.deleteUser[404])
  @UseGuards(JwtAccessGuard)
  @Delete('/:id')
  public async deleteTeamUser(@Param('id') id: number) {
    return await this.teamUserService.deleteTeamUser(id);
  }

  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: '팀 유저 권한 변경' })
  @ApiBody({ type: RequestTeamUserUpdateDto })
  @ApiResponse(TeamUserResponse.updateTeamUserRole[200])
  @ApiResponse(TeamUserResponse.updateTeamUserRole[404])
  @UseGuards(JwtAccessGuard)
  @Patch()
  public async updateTeamUserRole(@Body() dto: RequestTeamUserUpdateDto) {
    return await this.teamUserService.updateTeamUserRole(dto);
  }

  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: '팀의 유저 리스트 조회' })
  @ApiResponse(TeamUserResponse.findTeamUserList[200])
  @UseGuards(JwtAccessGuard)
  @Get('/user/:id')
  public async findTeamUserList(@Param('id') id: number) {
    return await this.teamUserService.findTeamUserList(id);
  }
}
