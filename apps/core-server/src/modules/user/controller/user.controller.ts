// ** Nest Imports
import { Body, Controller, Get, Put, Query, UseGuards } from '@nestjs/common';

// ** Module Imports
import UserService from '../service/user.service';
import TeamUserService from '../../team/service/team-user.service';
import TicketService from '../../ticket/service/ticket.service';
import WorkspaceService from '../../workspace/service/workspace.service';

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

// ** Response Imports
import { UserResponse } from '../../../global/response/user.response';
import {
  createServerExceptionResponse,
  createUnauthorizedResponse,
} from '../../../global/response/common';

// ** Utils Imports
import {
  GetTeam,
  TeamRole,
} from '@/src/global/decorators/team-role/team-role.decorator';
import { TeamRoleGuard } from '@/src/global/decorators/team-role/team-role.guard';
import { GetUser } from '../../../global/decorators/user/user.decorators';

// ** Dto Imports
import RequestUserUpdateDto from '../dto/user.update.dto';
import User from '../domain/user.entity';
import CommonResponse from '@/src/global/dto/api.response';
import Team from '../../team/domain/team.entity';
import RoleEnum from '@/src/global/enum/Role';
import TeamService from '../../team/service/team.service';

@ApiTags('User')
@ApiResponse(createServerExceptionResponse())
@ApiResponse(createUnauthorizedResponse())
@Controller({ path: '/user', version: '1' })
export default class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly ticketService: TicketService,
    private readonly teamUserService: TeamUserService,
    private readonly workspaceService: WorkspaceService,
    private readonly teamService: TeamService,
  ) {}

  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: '유저 정보 수정' })
  @ApiBody({ type: RequestUserUpdateDto })
  @ApiResponse(UserResponse.updateUser[200])
  @UseGuards(JwtAccessGuard)
  @Put('/')
  public async saveSocialUser(
    @Body() dto: RequestUserUpdateDto,
    @GetUser() user: User,
  ) {
    const team = await this.teamService.findPersonalTeamByEmail(user.email);
    await this.userService.updateUser(dto, user, team);

    return CommonResponse.createResponseMessage({
      statusCode: 200,
      message: '유저의 정보를 수정합니다.',
    });
  }

  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: '유저 정보 조회' })
  @ApiResponse(UserResponse.findUser[200])
  @ApiResponse(UserResponse.findUser[404])
  @UseGuards(JwtAccessGuard)
  @Get('/')
  public async findUser(@GetUser() user: User) {
    const findUser = await this.userService.findUser(user);

    return CommonResponse.createResponse({
      statusCode: 200,
      message: '유저 정보를 조회합니다.',
      data: findUser,
    });
  }

  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: '유저의 대시보드 조회' })
  @ApiResponse(UserResponse.findDashboardInfo[200])
  @UseGuards(JwtAccessGuard)
  @Get('/dashboard')
  public async dashboardInfo(@GetUser() { id }: User) {
    const teamCount = await this.teamUserService.findTeamUserCount(id);
    const ticketCount = await this.ticketService.findMyTicketCount(id);

    return CommonResponse.createResponse({
      data: { teamCount, ticketCount },
      statusCode: 200,
      message: '유저의 대시보드 정보를 조회합니다.',
    });
  }

  @ApiBearerAuth('access-token')
  @ApiHeader({ name: 'team-code', required: true })
  @ApiOperation({ summary: '유저의 티켓 대시보드 조회' })
  @ApiResponse(UserResponse.findDashboardInfo[200])
  @TeamRole(RoleEnum.VIEWER)
  @UseGuards(TeamRoleGuard)
  @UseGuards(JwtAccessGuard)
  @Get('/dashboard/ticket')
  public async dashboardTicketInfo(
    @GetTeam() { id }: Team,
    @Query('month') month: string,
  ) {
    const [data, count] = await this.ticketService.findMyTeamTicketList(
      id,
      month,
    );

    return CommonResponse.createResponse({
      data: { data, count },
      statusCode: 200,
      message: '유저의 대시보드 정보를 조회합니다.',
    });
  }

  @ApiBearerAuth('access-token')
  @ApiHeader({ name: 'team-code', required: true })
  @ApiOperation({ summary: '유저의 워크스페이스 대시보드 조회' })
  @ApiResponse(UserResponse.findDashboardInfo[200])
  @TeamRole(RoleEnum.VIEWER)
  @UseGuards(TeamRoleGuard)
  @UseGuards(JwtAccessGuard)
  @Get('/dashboard/workspace')
  public async dashboardWorkspaceInfo(
    @GetTeam() { id }: Team,
    @GetUser() { id: userId }: User,
  ) {
    const data = await this.workspaceService.findWorkspaceCountAndUserCount(id);
    const ticket = await this.workspaceService.findWorkspaceTicketCount(
      id,
      userId,
    );

    return CommonResponse.createResponse({
      data: { ...data, ticket },
      statusCode: 200,
      message: '유저의 대시보드 정보를 조회합니다.',
    });
  }
}
