// ** Nest Imports
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';

// ** Module Imports
import WorkspaceFunctionService from '../service/workspace-function.service';

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

// ** Response Imports
import {
  createServerExceptionResponse,
  createUnauthorizedResponse,
} from '../../../global/response/common';
import { WorkspaceFunctionResponse } from '@/src/global/response/workspace-function.response';

// ** Dto Imports
import RequestSaveWorkspaceFunctionDto from '../dto/workspace-function.save.dto';
import RoleEnum from '@/src/global/enum/Role';
import Workspace from '../../workspace/domain/workspace.entity';
import CommonResponse from '@/src/global/dto/api.response';
import RequestRemoveWorkspaceFunctionDto from '../dto/workspace-function.remove.dto';

@ApiTags('Workspace Function')
@ApiResponse(createServerExceptionResponse())
@ApiResponse(createUnauthorizedResponse())
@Controller({ path: '/workspace-function', version: '1' })
export default class WorkspaceFunctionController {
  constructor(
    private readonly workspaceFunctionService: WorkspaceFunctionService,
  ) {}

  @ApiBearerAuth('access-token')
  @ApiHeader({ name: 'workspace-code', required: true })
  @ApiOperation({ summary: '워크스페이스 기능 리스트 조회' })
  @ApiResponse(WorkspaceFunctionResponse.findWorkspaceFunctionList[200])
  @WorkspaceRole(RoleEnum.VIEWER)
  @UseGuards(WorkspaceRoleGuard)
  @UseGuards(JwtAccessGuard)
  @Get('/function')
  public async findWorkspaceFunctionList(@GetWorkspace() { id }: Workspace) {
    const list =
      await this.workspaceFunctionService.findWorkspaceFunctionList(id);

    return CommonResponse.createResponse({
      statusCode: 200,
      message: 'Find Workspace Function List',
      data: {
        data: list,
        count: list.length,
      },
    });
  }

  @ApiBearerAuth('access-token')
  @ApiHeader({ name: 'workspace-code', required: true })
  @ApiBody({ type: RequestSaveWorkspaceFunctionDto })
  @ApiOperation({ summary: '워크스페이스 기능 저장' })
  @ApiResponse(WorkspaceFunctionResponse.saveWorkspaceFunction[200])
  @ApiResponse(WorkspaceFunctionResponse.saveWorkspaceFunction[400])
  @ApiResponse(WorkspaceFunctionResponse.saveWorkspaceFunction[404])
  @WorkspaceRole(RoleEnum.ADMIN)
  @UseGuards(WorkspaceRoleGuard)
  @UseGuards(JwtAccessGuard)
  @Post()
  public async saveWorkspaceFunction(
    @Body() dto: RequestSaveWorkspaceFunctionDto,
    @GetWorkspace() workspace: Workspace,
  ) {
    await this.workspaceFunctionService.isExistedWorksapceFunction(
      workspace.id,
      dto.function,
    );

    await this.workspaceFunctionService.saveWorkspaceFunction(workspace, dto);

    return CommonResponse.createResponseMessage({
      statusCode: 200,
      message: 'Save Workspace Function',
    });
  }

  @ApiBearerAuth('access-token')
  @ApiHeader({ name: 'workspace-code', required: true })
  @ApiBody({ type: RequestSaveWorkspaceFunctionDto })
  @ApiOperation({ summary: '워크스페이스 기능 제거' })
  @ApiResponse(WorkspaceFunctionResponse.removeWorkspaceFunction[200])
  @ApiResponse(WorkspaceFunctionResponse.removeWorkspaceFunction[404])
  @WorkspaceRole(RoleEnum.ADMIN)
  @UseGuards(WorkspaceRoleGuard)
  @UseGuards(JwtAccessGuard)
  @Put()
  public async removeWorkspaceFunction(
    @Body() dto: RequestRemoveWorkspaceFunctionDto,
    @GetWorkspace() workspace: Workspace,
  ) {
    await this.workspaceFunctionService.isExistedWorksapceFunctionNot(
      workspace.id,
      dto.function,
    );

    await this.workspaceFunctionService.removeWorkspaceFunction(workspace, dto);

    return CommonResponse.createResponseMessage({
      statusCode: 200,
      message: 'Remove Workspace Function',
    });
  }

  @ApiBearerAuth('access-token')
  @ApiHeader({ name: 'workspace-code', required: true })
  @ApiOperation({ summary: '워크스페이스의 기능 리스트 조회' })
  @ApiResponse(WorkspaceFunctionResponse.findFunctionList[200])
  @WorkspaceRole(RoleEnum.VIEWER)
  @UseGuards(WorkspaceRoleGuard)
  @UseGuards(JwtAccessGuard)
  @Get('/:id')
  public async findFunctionList(@Param('id') id: number) {
    const [data, count] =
      await this.workspaceFunctionService.findFunctionList(id);

    return CommonResponse.createResponse({
      statusCode: 200,
      message: 'Find Workspace Function List',
      data: {
        data: data,
        count: count,
      },
    });
  }
}
