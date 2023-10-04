// ** Nest Imports
import { Body, Controller, Get, Put, Req, UseGuards } from '@nestjs/common';

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
import JwtAccessGuard from '../../../api/auth/passport/auth.jwt-access.guard';

// ** Response Imports
import { WorkspaceUserResponse } from '../../../response/workspace-user.response';
import {
  createServerExceptionResponse,
  createUnauthorizedResponse,
} from '../../../response/common';

// ** Dto Imports
import { RequestWithUsernDto } from '../../../common/dto/request.user.dto';
import RequestWorkspaceUpdateUpdateDto from '../dto/workspace-user.update.dto';

@ApiTags('Workspace User')
@ApiResponse(createServerExceptionResponse())
@ApiResponse(createUnauthorizedResponse())
@Controller({ path: '/workspace-user', version: '1' })
export default class WorkspaceUserController {
  constructor(private readonly workspaceUserService: WorkspaceUserService) {}

  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: '워크스페이스 리스트 조회' })
  @ApiResponse(WorkspaceUserResponse.findWorkspaceList[200])
  @UseGuards(JwtAccessGuard)
  @Get('/')
  public async findWorkspaceList(@Req() { user }: RequestWithUsernDto) {
    return await this.workspaceUserService.findWorkspaceList(user);
  }

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
}
