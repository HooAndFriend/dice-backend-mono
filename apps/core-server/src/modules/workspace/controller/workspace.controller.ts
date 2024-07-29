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
import { RoleEnum } from '@hi-dice/common';
import { CommonResponse } from '@hi-dice/common';
import Workspace from '../domain/workspace.entity';
import RequestWorkspaceTaskFindDto from '../dto/workspace-task.find.dto';
import dayjs from 'dayjs';
import TicketService from '../../task/ticket/service/ticket.service';

@ApiTags('Workspace')
@ApiResponse(createServerExceptionResponse())
@ApiResponse(createUnauthorizedResponse())
@Controller({ path: '/workspace', version: '1' })
export default class WorkspaceController {
  constructor(
    private readonly workspaceService: WorkspaceService,
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
  @UseGuards(JwtAccessGuard)
  @Post('/')
  public async saveWorkspace(
    @Body() dto: RequestWorkspaceSaveDto,
    @GetUser() user: User,
  ) {
    await this.workspaceService.saveWorkspace(dto, user);

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
    @GetWorkspace() { workspaceId }: Workspace,
  ) {
    await this.workspaceService.updateWorkspace(dto, workspaceId);

    return CommonResponse.createResponseMessage({
      statusCode: 200,
      message: 'Update Workspace',
    });
  }

  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: '워크스페이스 리스트 조회(With Count)' })
  @ApiResponse(WorkspaceResponse.findWorkspaceListWithCount[200])
  @UseGuards(JwtAccessGuard)
  @Get('/list/popup')
  public async findWorkspaceListWithCount() {
    // const data = await this.workspaceService.findWorkspaceListWithCount(
    //   team.id,
    // );

    return CommonResponse.createResponse({
      statusCode: 200,
      message: 'Find Workspace List',
      data: { data: [], count: 0 },
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
  public async findWorkspace(@GetWorkspace() { workspaceId }: Workspace) {
    const workspace = await this.workspaceService.findWorkspace(workspaceId);

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
  public async findMainWorkspace(@GetWorkspace() { workspaceId }: Workspace) {
    const workspace = await this.workspaceService.findMainWorkspace(
      workspaceId,
    );

    return CommonResponse.createResponse({
      statusCode: 200,
      message: 'Find Workspace Info',
      data: workspace,
    });
  }
}
