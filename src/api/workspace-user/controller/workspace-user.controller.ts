// ** Nest Imports
import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
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

// ** Dto Imports
import { RequestWithUsernDto } from 'src/common/dto/request.user.dto';
import JwtAccessGuard from 'src/api/auth/passport/auth.jwt-access.guard';
import { WorkspaceUserResponse } from 'src/response/workspace-user.response';
import {
  createServerExceptionResponse,
  createUnauthorizedResponse,
} from 'src/response/common';
import RequestWorkspaceUpdateUpdateDto from '../dto/workspace-user.update.dto';
@ApiTags('Workspace User')
@ApiResponse(createServerExceptionResponse())
@ApiResponse(createUnauthorizedResponse())
@Controller('/api/workspace-user')
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
