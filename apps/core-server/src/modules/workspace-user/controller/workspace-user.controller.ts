// ** Nest Imports
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
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
import Workspace from '../../workspace/domain/workspace.entity';

@ApiTags('Workspace User')
@ApiResponse(createServerExceptionResponse())
@ApiResponse(createUnauthorizedResponse())
@Controller({ path: '/workspace-user', version: '1' })
export default class WorkspaceUserController {
  constructor(private readonly workspaceUserService: WorkspaceUserService) {}

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
  ) {
    await this.workspaceUserService.saveWorkspaceUser(workspace, dto);

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
  @ApiOperation({ summary: '워크스페이스 초대 가능한 멤버 조회' })
  @ApiResponse(WorkspaceUserResponse.findInviteUserList[200])
  @WorkspaceRole(RoleEnum.ADMIN)
  @UseGuards(WorkspaceRoleGuard)
  @UseGuards(JwtAccessGuard)
  @Get('/invite')
  public async findInviteUserList(@GetWorkspace() workspace: Workspace) {
    const list = await this.workspaceUserService.findInviteUserList(workspace);

    return CommonResponse.createResponse({
      statusCode: 200,
      message: 'Find Team List to invite workspace',
      data: { data: list, count: list.length },
    });
  }
}
