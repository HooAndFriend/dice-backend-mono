// ** Nest Imports
import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
// ** Module Imports
import WorkspaceUserService from '../service/workspace-user.service';

// ** Swagger Imports
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

// ** Dto Imports
import { RequestWithUsernDto } from 'src/common/dto/request.user.dto';
import JwtAccessGuard from 'src/api/auth/passport/auth.jwt-access.guard';
import { WorkspaceUserResponse } from 'src/response/workspace-user.response';
@ApiTags('Workspace User')
@Controller('/api/workspace/user')
export default class WorkspaceUserController {
  constructor(private readonly workspaceUserService: WorkspaceUserService) {}

  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: '워크스페이스 리스트 조회' })
  @ApiResponse(WorkspaceUserResponse.findWorkspaceList[200])
  @UseGuards(JwtAccessGuard)
  @Get('/')
  public async saveUser(@Req() { user }: RequestWithUsernDto) {
    return await this.workspaceUserService.findWorkspaceList(user);
  }
}
