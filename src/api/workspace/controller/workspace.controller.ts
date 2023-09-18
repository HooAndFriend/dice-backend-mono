// ** Nest Imports
import { Body, Controller, Post, Put, Req, UseGuards } from '@nestjs/common';

// ** Module Imports
import WorkspaceService from '../service/workspace.service';

// ** Swagger Imports
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { WorkspaceResponse } from 'src/response/workspace.response';
import RequestWorkspaceSaveDto from '../dto/workspace.save.dto';
import { RequestWithUsernDto } from 'src/common/dto/request.user.dto';
import JwtAccessGuard from 'src/api/auth/passport/auth.jwt-access.guard';
import RequestWorkspaceUpdateDto from '../dto/workspace.update.dto';

@ApiTags('Workspace')
@Controller('/api/workspace')
export default class WorkspaceController {
  constructor(private readonly workspaceService: WorkspaceService) {}

  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: '워크스페이스 생성' })
  @ApiBody({ type: RequestWorkspaceSaveDto })
  @ApiResponse(WorkspaceResponse.saveWorksapce[200])
  @ApiResponse(WorkspaceResponse.saveWorksapce[400])
  @UseGuards(JwtAccessGuard)
  @Post('/')
  public async saveWorkspace(
    @Body() dto: RequestWorkspaceSaveDto,
    @Req() { user }: RequestWithUsernDto,
  ) {
    return await this.workspaceService.saveWorksapce(dto, user);
  }

  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: '워크스페이스 수정' })
  @ApiBody({ type: RequestWorkspaceUpdateDto })
  @ApiResponse(WorkspaceResponse.updateWorkspace[200])
  @ApiResponse(WorkspaceResponse.updateWorkspace[404])
  @UseGuards(JwtAccessGuard)
  @Put('/')
  public async updateWorkspace(@Body() dto: RequestWorkspaceUpdateDto) {
    return await this.workspaceService.updateWorkspace(dto);
  }
}
