// ** Nest Imports
import { Body, Controller, Post, Put, UseGuards } from '@nestjs/common';

// ** Module Imports
import WorkspaceUserService from '../service/workspace-user.service';

// ** Swagger Imports
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

// ** Utils Imports
import JwtAccessGuard from '../../auth/passport/auth.jwt-access.guard';

// ** Response Imports
import { WorkspaceUserResponse } from '../../../response/workspace-user.response';
import {
  createServerExceptionResponse,
  createUnauthorizedResponse,
} from '../../../response/common';

// ** Dto Imports
import RequestWorkspaceUpdateUpdateDto from '../dto/workspace-user.update.dto';
import RequestWorkspaceUserSaveDto from '../dto/workspace-user.save.dto';

@ApiTags('Workspace User')
@ApiResponse(createServerExceptionResponse())
@ApiResponse(createUnauthorizedResponse())
@Controller({ path: '/workspace-user', version: '1' })
export default class WorkspaceUserController {
  constructor(private readonly workspaceUserService: WorkspaceUserService) {}

  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: '워크스페이스 권한 수정' })
  @ApiBody({ type: RequestWorkspaceUpdateUpdateDto })
  @ApiResponse(WorkspaceUserResponse.updateWorkspaceRole[200])
  @ApiResponse(WorkspaceUserResponse.updateWorkspaceRole[404])
  @UseGuards(JwtAccessGuard)
  @Put('/')
  public async updateWorksapceUserRole(
    @Body() dto: RequestWorkspaceUpdateUpdateDto,
  ) {
    return await this.workspaceUserService.updateWorksapceUserRole(dto);
  }

  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: '워크스페이스 멤버 추가' })
  @ApiBody({ type: RequestWorkspaceUserSaveDto })
  @ApiResponse(WorkspaceUserResponse.saveWorkspaceUser[200])
  @ApiResponse(WorkspaceUserResponse.saveWorkspaceUser[404])
  @UseGuards(JwtAccessGuard)
  @Post('/')
  public async saveWorkspaceUser(@Body() dto: RequestWorkspaceUserSaveDto) {
    return await this.workspaceUserService.saveWorkspaceUser(dto);
  }
}
