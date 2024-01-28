// ** Nest Imports
import { Body, Controller, Get, Post, Put, UseGuards } from '@nestjs/common';

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
import TeamUser from '../../team-user/domain/team-user.entity';
import Workspace from '../domain/workspace.entity';

@ApiTags('Workspace')
@ApiResponse(createServerExceptionResponse())
@ApiResponse(createUnauthorizedResponse())
@Controller({ path: '/workspace', version: '1' })
export default class WorkspaceController {
  constructor(private readonly workspaceService: WorkspaceService) {}

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
    if (teamUser.team.id === 0) {
      await this.workspaceService.savePersonalWorkspace(dto, user);
    } else {
      await this.workspaceService.saveTeamWorksapce(dto, teamUser);
    }

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
  @ApiOperation({ summary: '워크스페이스 리스트 조회' })
  @ApiHeader({ name: 'team-code', required: true })
  @ApiResponse(WorkspaceResponse.findWorkspaceList[200])
  @TeamRole(RoleEnum.VIEWER)
  @UseGuards(TeamRoleGuard)
  @UseGuards(JwtAccessGuard)
  @Get('/list')
  public async findWorkspaceList(@GetUser() user: User, @GetTeam() team: Team) {
    const [data, count] = await this.workspaceService.findWorkspaceList(
      user,
      team.id,
    );

    return CommonResponse.createPaginationResponse({
      statusCode: 200,
      message: 'Find Workspace List',
      data,
      count,
    });
  }

  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: '워크스페이스 조회' })
  @ApiHeader({ name: 'workspace-code', required: true })
  @ApiResponse(WorkspaceResponse.findWorkspace[200])
  @ApiResponse(WorkspaceResponse.findWorkspace[404])
  @WorkspaceRole(RoleEnum.ADMIN)
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
  @WorkspaceRole(RoleEnum.ADMIN)
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
}
