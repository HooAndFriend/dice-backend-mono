// ** Nest Imports
import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Query,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';

// ** Module Imports
import WorkspaceService from '../service/workspace.service';

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
import { GetUser } from '../../../global/decorators/user/user.decorators';
import {
  GetTeam,
  GetTeamUser,
  TeamRole,
} from '@/src/global/decorators/team-role/team-role.decorator';
import { TeamRoleGuard } from '@/src/global/decorators/team-role/team-role.guard';
import {
  GetWorkspace,
  WorkspaceRole,
} from '@/src/global/decorators/workspace-role/workspace-role.decorator';
import { WorkspaceRoleGuard } from '@/src/global/decorators/workspace-role/workspace-role.guard';

// ** Response Imports
import { WorkspaceResponse } from '../../../global/response/workspace.response';
import {
  createServerExceptionResponse,
  createUnauthorizedResponse,
} from '../../../global/response/common';

// ** Dto Imports
import RequestWorkspaceSaveDto from '../dto/workspace.save.dto';
import RequestWorkspaceUpdateDto from '../dto/workspace.update.dto';
import User from '../../user/domain/user.entity';
import RoleEnum from '@/src/global/enum/Role';
import Team from '../../team/domain/team.entity';
import CommonResponse from '@/src/global/dto/api.response';
import TeamUser from '../../team/domain/team-user.entity';
import Workspace from '../domain/workspace.entity';
import QaService from '../../qa/service/qa.service';
import TicketService from '../../ticket/service/ticket.service';
import RequestWorkspaceTaskFindDto from '../dto/workspace-task.find.dto';
import dayjs from 'dayjs';

@ApiTags('Workspace')
@ApiResponse(createServerExceptionResponse())
@ApiResponse(createUnauthorizedResponse())
@Controller({ path: '/workspace', version: '1' })
export default class WorkspaceController {
  constructor(
    private readonly workspaceService: WorkspaceService,
    private readonly qaService: QaService,
    private readonly ticketService: TicketService,
  ) {}

  @ApiBearerAuth('access-token')
  @ApiHeader({
    name: 'team-code',
    required: true,
  })
  @ApiOperation({ summary: '워크스페이스 생성' })
  @ApiBody({ type: RequestWorkspaceSaveDto })
  @ApiResponse(WorkspaceResponse.saveWorksapce[200])
  @ApiResponse(WorkspaceResponse.saveWorksapce[400])
  @TeamRole(RoleEnum.ADMIN)
  @UseGuards(TeamRoleGuard)
  @UseGuards(JwtAccessGuard)
  @Post('/')
  public async saveWorkspace(
    @Body() dto: RequestWorkspaceSaveDto,
    @GetUser() user: User,
    @GetTeamUser() teamUser: TeamUser,
  ) {
    await this.workspaceService.saveTeamWorksapce(dto, teamUser);

    return CommonResponse.createResponseMessage({
      statusCode: 200,
      message: 'Save Workspace',
    });
  }

  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: '워크스페이스 수정' })
  @ApiHeader({ name: 'workspace-code', required: true })
  @ApiBody({ type: RequestWorkspaceUpdateDto })
  @ApiResponse(WorkspaceResponse.updateWorkspace[200])
  @ApiResponse(WorkspaceResponse.updateWorkspace[404])
  @WorkspaceRole(RoleEnum.WRITER)
  @UseGuards(WorkspaceRoleGuard)
  @UseGuards(JwtAccessGuard)
  @Put('/')
  public async updateWorkspace(
    @Body() dto: RequestWorkspaceUpdateDto,
    @GetWorkspace() { id }: Workspace,
  ) {
    await this.workspaceService.updateWorkspace(dto, id);

    return CommonResponse.createResponseMessage({
      statusCode: 200,
      message: 'Update Workspace',
    });
  }

  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: '워크스페이스 리스트 조회(With Count)' })
  @ApiHeader({ name: 'team-code', required: true })
  @ApiResponse(WorkspaceResponse.findWorkspaceListWithCount[200])
  @TeamRole(RoleEnum.VIEWER)
  @UseGuards(TeamRoleGuard)
  @UseGuards(JwtAccessGuard)
  @Get('/list/popup')
  public async findWorkspaceListWithCount(@GetTeam() team: Team) {
    const data = await this.workspaceService.findWorkspaceListWithCount(
      team.id,
    );

    return CommonResponse.createResponse({
      statusCode: 200,
      message: 'Find Workspace List',
      data: { data, count: data.length },
    });
  }

  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: '워크스페이스 조회' })
  @ApiHeader({ name: 'workspace-code', required: true })
  @ApiResponse(WorkspaceResponse.findWorkspace[200])
  @ApiResponse(WorkspaceResponse.findWorkspace[404])
  @WorkspaceRole(RoleEnum.VIEWER)
  @UseGuards(WorkspaceRoleGuard)
  @UseGuards(JwtAccessGuard)
  @Get('/')
  public async findWorkspace(@GetWorkspace() { id }: Workspace) {
    const workspace = await this.workspaceService.findWorkspace(id);

    return CommonResponse.createResponse({
      statusCode: 200,
      message: 'Find Workspace',
      data: workspace,
    });
  }

  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: '워크스페이스 메인 조회' })
  @ApiHeader({ name: 'workspace-code', required: true })
  @ApiResponse(WorkspaceResponse.findWorkspaceMain[200])
  @ApiResponse(WorkspaceResponse.findWorkspaceMain[404])
  @WorkspaceRole(RoleEnum.VIEWER)
  @UseGuards(WorkspaceRoleGuard)
  @UseGuards(JwtAccessGuard)
  @Get('/home')
  public async findMainWorkspace(@GetWorkspace() { id }: Workspace) {
    const workspace = await this.workspaceService.findMainWorkspace(id);

    return CommonResponse.createResponse({
      statusCode: 200,
      message: 'Find Workspace Info',
      data: workspace,
    });
  }

  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: '워크스페이스의 오늘 할 일 조회' })
  @ApiHeader({ name: 'workspace-code', required: true })
  @ApiResponse(WorkspaceResponse.findWorksapceTaskCount[200])
  @WorkspaceRole(RoleEnum.VIEWER)
  @UseGuards(WorkspaceRoleGuard)
  @UseGuards(JwtAccessGuard)
  @Get('/task')
  public async findWorksapceTaskCount(@GetWorkspace() { id }: Workspace) {
    const { qaCount, yesterDayQaCount } = await this.qaService.findQaCount(id);
    const { ticketCount, yesterDayTicketCount } =
      await this.ticketService.findTicketCount(id);

    return CommonResponse.createResponse({
      statusCode: 200,
      message: 'Find Workspace Today Task Count',
      data: {
        count: qaCount + ticketCount,
        yesterdayCount: yesterDayQaCount + yesterDayTicketCount,
      },
    });
  }

  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: '워크스페이스의 한 일 Progress 조회' })
  @ApiHeader({ name: 'workspace-code', required: true })
  @ApiResponse(WorkspaceResponse.findWorksapceTaskCount[200])
  @WorkspaceRole(RoleEnum.VIEWER)
  @UseGuards(WorkspaceRoleGuard)
  @UseGuards(JwtAccessGuard)
  @Get('/task/progress')
  public async findWorksapceTaskProgressCount(
    @GetWorkspace() { id }: Workspace,
  ) {
    const {
      qaCount,
      qaCompleteCount,
      yesterDayQaCompleteCount,
      yesterDayQaCount,
    } = await this.qaService.findQaCountAll(id);
    const {
      ticketCount,
      yesterDayTicketCount,
      ticketCompleteCount,
      yesterDayTicketCompleteCount,
    } = await this.ticketService.findTicketCountAll(id);

    return CommonResponse.createResponse({
      statusCode: 200,
      message: 'Find Workspace Today Task Progress',
      data: {
        todayProgress:
          ((qaCompleteCount + ticketCompleteCount) / (qaCount + ticketCount)) *
          100,
        yesterdayProgress:
          ((yesterDayQaCompleteCount + yesterDayTicketCompleteCount) /
            (yesterDayQaCount + yesterDayTicketCount)) *
          100,
      },
    });
  }

  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: '워크스페이스의 전체 처리한 티켓 개수 조회' })
  @ApiHeader({ name: 'workspace-code', required: true })
  @ApiResponse(WorkspaceResponse.findWorksapceTaskCount[200])
  @WorkspaceRole(RoleEnum.VIEWER)
  @UseGuards(WorkspaceRoleGuard)
  @UseGuards(JwtAccessGuard)
  @Get('/task/done')
  public async findWorksapceDoneTaskCount(@GetWorkspace() { id }: Workspace) {
    const { qaCount, yesterDayQaCount } = await this.qaService.findQaDoneCount(
      id,
    );
    const { ticketCount, yesterDayTicketCount } =
      await this.ticketService.findTicketDoneCount(id);

    return CommonResponse.createResponse({
      statusCode: 200,
      message: 'Find Workspace Total Done Task Count',
      data: {
        count: qaCount + ticketCount,
        yesterdayCount: yesterDayQaCount + yesterDayTicketCount,
      },
    });
  }

  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: '워크스페이스의 이번 달 Task 조회' })
  @ApiHeader({ name: 'workspace-code', required: true })
  @ApiResponse(WorkspaceResponse.findWorksapceCalendarTaskCount[200])
  @WorkspaceRole(RoleEnum.VIEWER)
  @UseGuards(WorkspaceRoleGuard)
  @UseGuards(JwtAccessGuard)
  @Get('/task/calendar')
  public async findWorksapceCalendarTaskCount(
    @GetWorkspace() { id }: Workspace,
    @GetUser() { id: userId }: User,
    @Query(ValidationPipe) query: RequestWorkspaceTaskFindDto,
  ) {
    const ticketList = await this.ticketService.findTicketListByDate(
      id,
      userId,
      query,
    );

    const qaList = await this.qaService.findQaListByDate(id, userId, query);

    return CommonResponse.createResponse({
      statusCode: 200,
      message: 'Find Workspace Total Done Task Count',
      data: [
        ...ticketList.map((item) => ({ ...item, type: 'ticket' })),
        ...qaList.map((item) => ({
          id: item.id,
          name: item.title,
          dueDate: item.dueDate,
          type: 'QA',
          createdDate: item.createdDate,
        })),
      ].sort((a, b) => dayjs(a.dueDate).diff(dayjs(b.dueDate))),
    });
  }
}
