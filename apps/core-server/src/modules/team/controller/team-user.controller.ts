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
  ApiHeader,
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
import CommonResponse from '@/src/global/dto/api.response';
import {
  GetTeam,
  TeamRole,
} from '@/src/global/decorators/team-role/team-role.decorator';
import { RoleEnum } from '@repo/common';
import { TeamRoleGuard } from '@/src/global/decorators/team-role/team-role.guard';
import Team from '../domain/team.entity';

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
    const [data, count] = await this.teamUserService.findTeamList(id);

    return CommonResponse.createResponse({
      statusCode: 200,
      message: 'Find User Team List',
      data: { data, count },
    });
  }

  @ApiBearerAuth('access-token')
  @ApiHeader({ name: 'team-code', required: true })
  @ApiOperation({ summary: '팀 유저 초대' })
  @ApiBody({ type: RequestTeamUserSaveDto })
  @ApiResponse(TeamUserResponse.inviteUser[200])
  @ApiResponse(TeamUserResponse.inviteUser[404])
  @TeamRole(RoleEnum.ADMIN)
  @UseGuards(TeamRoleGuard)
  @UseGuards(JwtAccessGuard)
  @Post()
  public async saveTeamUser(
    @Body() dto: RequestTeamUserSaveDto,
    @GetTeam() team: Team,
    @GetUser() { email }: User,
  ) {
    await this.teamUserService.isExistedTeamUserByEmail(dto.email, team.id);
    await this.teamUserService.inviteTeamUser(team, dto, email);

    return CommonResponse.createResponseMessage({
      statusCode: 200,
      message: 'Invite User',
    });
  }

  @ApiBearerAuth('access-token')
  @ApiHeader({ name: 'team-code', required: true })
  @ApiOperation({ summary: '팀 유저 삭제' })
  @ApiResponse(TeamUserResponse.deleteUser[200])
  @ApiResponse(TeamUserResponse.deleteUser[404])
  @TeamRole(RoleEnum.ADMIN)
  @UseGuards(TeamRoleGuard)
  @UseGuards(JwtAccessGuard)
  @Delete('/:id')
  public async deleteTeamUser(@Param('id') id: number) {
    await this.teamUserService.existTeamUserById(id);
    await this.teamUserService.deleteTeamUser(id);

    return CommonResponse.createResponseMessage({
      statusCode: 200,
      message: 'Delete Team User',
    });
  }

  @ApiBearerAuth('access-token')
  @ApiHeader({ name: 'team-code', required: true })
  @ApiOperation({ summary: '팀 유저 권한 변경' })
  @ApiBody({ type: RequestTeamUserUpdateDto })
  @ApiResponse(TeamUserResponse.updateTeamUserRole[200])
  @ApiResponse(TeamUserResponse.updateTeamUserRole[404])
  @TeamRole(RoleEnum.ADMIN)
  @UseGuards(TeamRoleGuard)
  @UseGuards(JwtAccessGuard)
  @Patch()
  public async updateTeamUserRole(@Body() dto: RequestTeamUserUpdateDto) {
    await this.teamUserService.existTeamUserById(dto.teamUserId);
    await this.teamUserService.updateTeamUserRole(dto);

    return CommonResponse.createResponseMessage({
      statusCode: 200,
      message: 'Update Team User Role',
    });
  }

  @ApiBearerAuth('access-token')
  @ApiHeader({ name: 'team-code', required: true })
  @ApiOperation({ summary: '팀의 유저 리스트 조회' })
  @ApiResponse(TeamUserResponse.findTeamUserList[200])
  @TeamRole(RoleEnum.VIEWER)
  @UseGuards(TeamRoleGuard)
  @UseGuards(JwtAccessGuard)
  @Get('/user')
  public async findTeamUserList(@GetTeam() { id }: Team) {
    const [data, count] = await this.teamUserService.findTeamUserList(id);

    return CommonResponse.createResponse({
      statusCode: 200,
      message: 'Find Team User List',
      data: { data, count },
    });
  }
}
