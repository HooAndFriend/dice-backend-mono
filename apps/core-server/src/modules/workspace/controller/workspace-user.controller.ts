// ** Nest Imports
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';

// ** Module Imports
import WorkspaceUserService from '../service/workspace-user.service';

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
import {
  GetWorkspace,
  WorkspaceRole,
} from '@/src/global/decorators/workspace-role/workspace-role.decorator';
import { WorkspaceRoleGuard } from '@/src/global/decorators/workspace-role/workspace-role.guard';
import { GetUser } from '@/src/global/decorators/user/user.decorators';

// ** Response Imports
import { WorkspaceUserResponse } from '../../../global/response/workspace-user.response';
import {
  createServerExceptionResponse,
  createUnauthorizedResponse,
} from '../../../global/response/common';

// ** Dto Imports
import RequestWorkspaceUpdateUpdateDto from '../dto/workspace-user.update.dto';
import RequestWorkspaceUserSaveDto from '../dto/workspace-user.save.dto';
import RoleEnum from '@/src/global/enum/Role';
import CommonResponse from '@/src/global/dto/api.response';
import Workspace from '../domain/workspace.entity';
import User from '../../user/domain/user.entity';
import {
  GetTeam,
  TeamRole,
} from '@/src/global/decorators/team-role/team-role.decorator';
import Team from '../../team/domain/team.entity';
import { TeamRoleGuard } from '@/src/global/decorators/team-role/team-role.guard';
import RequestWorkspaceUserFindDto from '../dto/workspace-user.find.dto';
import TeamService from '../../team/service/team.service';

@ApiTags('Workspace User')
@ApiResponse(createServerExceptionResponse())
@ApiResponse(createUnauthorizedResponse())
@Controller({ path: '/workspace-user', version: '1' })
export default class WorkspaceUserController {
  constructor(
    private readonly workspaceUserService: WorkspaceUserService,
    private readonly teamService: TeamService,
  ) {}

  @ApiBearerAuth('access-token')
  @ApiHeader({ name: 'workspace-code', required: true })
  @ApiOperation({ summary: '워크스페이스 권한 수정' })
  @ApiBody({ type: RequestWorkspaceUpdateUpdateDto })
  @ApiResponse(WorkspaceUserResponse.updateWorkspaceRole[200])
  @ApiResponse(WorkspaceUserResponse.updateWorkspaceRole[404])
  @WorkspaceRole(RoleEnum.ADMIN)
  @UseGuards(WorkspaceRoleGuard)
  @UseGuards(JwtAccessGuard)
  @Put('/')
  public async updateWorksapceUserRole(
    @Body() dto: RequestWorkspaceUpdateUpdateDto,
  ) {
    await this.workspaceUserService.existedWorksapceUserById(dto.id);

    await this.workspaceUserService.updateWorksapceUserRole(dto);

    return CommonResponse.createResponseMessage({
      statusCode: 200,
      message: '워크스페이스에서 유저의 권한을 수정합니다.',
    });
  }

  @ApiBearerAuth('access-token')
  @ApiHeader({ name: 'workspace-code', required: true })
  @ApiOperation({ summary: '워크스페이스 멤버 추가' })
  @ApiBody({ type: RequestWorkspaceUserSaveDto })
  @ApiResponse(WorkspaceUserResponse.saveWorkspaceUser[200])
  @ApiResponse(WorkspaceUserResponse.saveWorkspaceUser[404])
  @WorkspaceRole(RoleEnum.ADMIN)
  @UseGuards(WorkspaceRoleGuard)
  @UseGuards(JwtAccessGuard)
  @Post('/')
  public async saveWorkspaceUser(
    @Body() dto: RequestWorkspaceUserSaveDto,
    @GetWorkspace() workspace: Workspace,
    @GetUser() { email }: User,
  ) {
    await this.workspaceUserService.saveWorkspaceUser(workspace, dto, email);

    return CommonResponse.createResponseMessage({
      statusCode: 200,
      message: 'Invite Worksapce User',
    });
  }

  @ApiBearerAuth('access-token')
  @ApiHeader({ name: 'workspace-code', required: true })
  @ApiOperation({ summary: '워크스페이스 멤버 삭제' })
  @ApiResponse(WorkspaceUserResponse.deleteWorkspaceUser[200])
  @ApiResponse(WorkspaceUserResponse.deleteWorkspaceUser[404])
  @WorkspaceRole(RoleEnum.ADMIN)
  @UseGuards(WorkspaceRoleGuard)
  @UseGuards(JwtAccessGuard)
  @Delete('/:id')
  public async deletWorksapceUser(@Param('id') id: number) {
    await this.workspaceUserService.existedWorksapceUserById(id);

    await this.workspaceUserService.deleteWorksapceUser(id);

    return CommonResponse.createResponseMessage({
      statusCode: 200,
      message: 'Delete Workspace User',
    });
  }

  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: '유저의 워크스페이스 리스트 조회' })
  @ApiResponse(WorkspaceUserResponse.findUserWorkspaceList[200])
  @UseGuards(JwtAccessGuard)
  @Get('/my')
  public async findUserWorkspaceList(@GetUser() { id }: User) {
    const [data, count] = await this.workspaceUserService.findUserWorkspaceList(
      id,
    );

    return CommonResponse.createResponse({
      statusCode: 200,
      message: 'Find User Workspace List',
      data: { data, count },
    });
  }

  @ApiBearerAuth('access-token')
  @ApiHeader({ name: 'team-code', required: true })
  @ApiOperation({ summary: '워크스페이스 리스트 조회 조회 By Team' })
  @ApiResponse(WorkspaceUserResponse.findWorkspaceUserList[200])
  @TeamRole(RoleEnum.VIEWER)
  @UseGuards(TeamRoleGuard)
  @UseGuards(JwtAccessGuard)
  @Get('/team')
  public async findMyWorkspaceList(
    @GetTeam() { id }: Team,
    @GetUser() { id: userId }: User,
  ) {
    const [data, count] =
      await this.workspaceUserService.findWorkspaceUserListByTeam(id, userId);

    return CommonResponse.createResponse({
      statusCode: 200,
      message: 'Find Workspace List',
      data: { data, count },
    });
  }

  @ApiBearerAuth('access-token')
  @ApiHeader({ name: 'workspace-code', required: true })
  @ApiOperation({ summary: '워크스페이스 멤버 조회' })
  @ApiResponse(WorkspaceUserResponse.findWorkspaceUserList[200])
  @WorkspaceRole(RoleEnum.VIEWER)
  @UseGuards(WorkspaceRoleGuard)
  @UseGuards(JwtAccessGuard)
  @Get('/')
  public async findWorkspaceUserList(@GetWorkspace() { id }: Workspace) {
    const [data, count] = await this.workspaceUserService.findWorkspaceUserList(
      id,
    );

    return CommonResponse.createResponse({
      statusCode: 200,
      message: 'Find Workspace User List',
      data: { data, count },
    });
  }

  @ApiBearerAuth('access-token')
  @ApiHeader({ name: 'workspace-code', required: true })
  @ApiOperation({ summary: '워크스페이스의 유저 통계 조회' })
  @ApiResponse(WorkspaceUserResponse.findWorkspaceUserCount[200])
  @WorkspaceRole(RoleEnum.VIEWER)
  @UseGuards(WorkspaceRoleGuard)
  @UseGuards(JwtAccessGuard)
  @Get('/count')
  public async findWorkspaceUserCount(@GetWorkspace() { id }: Workspace) {
    const data = await this.workspaceUserService.findWorkspaceUserCount(id);

    return CommonResponse.createResponse({
      data,
      statusCode: 200,
      message: 'Find Workspace User Count',
    });
  }

  @ApiBearerAuth('access-token')
  @ApiHeader({ name: 'workspace-code', required: true })
  @ApiOperation({ summary: '워크스페이스 초대 가능한 멤버 조회' })
  @ApiResponse(WorkspaceUserResponse.findInviteUserList[200])
  @WorkspaceRole(RoleEnum.ADMIN)
  @UseGuards(WorkspaceRoleGuard)
  @UseGuards(JwtAccessGuard)
  @Get('/invite')
  public async findInviteUserList(@GetWorkspace() workspace: Workspace) {
    const team = await this.teamService.findTeamByWorkspaceId(workspace.id);
    const list = await this.workspaceUserService.findInviteUserList(
      workspace,
      team,
    );

    return CommonResponse.createResponse({
      statusCode: 200,
      message: 'Find Team List to invite workspace',
      data: { data: list, count: list.length },
    });
  }

  @ApiBearerAuth('access-token')
  @ApiHeader({ name: 'workspace-code', required: true })
  @ApiOperation({ summary: '워크스페이스 멤버 리스트 조회' })
  @ApiResponse(WorkspaceUserResponse.searchWorkspaceUser[200])
  @WorkspaceRole(RoleEnum.VIEWER)
  @UseGuards(WorkspaceRoleGuard)
  @UseGuards(JwtAccessGuard)
  @Get('/search')
  public async searchWorkspaceUser(
    @Query(ValidationPipe) dto: RequestWorkspaceUserFindDto,
    @GetWorkspace() { id }: Workspace,
  ) {
    const [data, count] = await this.workspaceUserService.searchWorkspaceUser(
      dto,
      id,
    );

    return CommonResponse.createResponse({
      data: { data, count },
      statusCode: 200,
      message: 'Find Workspace User List',
    });
  }
}
