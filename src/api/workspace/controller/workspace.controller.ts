// ** Nest Imports
import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';

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

@ApiTags('Workspace')
@Controller('workspace')
export default class WorkspaceController {
  constructor(private readonly workspaceService: WorkspaceService) {}

  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: '유저 생성' })
  @ApiBody({ type: RequestWorkspaceSaveDto })
  @ApiResponse(WorkspaceResponse.saveWorksapce[200])
  @ApiResponse(WorkspaceResponse.saveWorksapce[400])
  @UseGuards(JwtAccessGuard)
  @Post('/user')
  public async saveUser(
    @Body() dto: RequestWorkspaceSaveDto,
    @Req() { user }: RequestWithUsernDto,
  ) {
    return await this.workspaceService.saveWorksapce(dto, user);
  }
}
