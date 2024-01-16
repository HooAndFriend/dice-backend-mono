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
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

// ** Utils Imports
import JwtAccessGuard from '../../auth/passport/auth.jwt-access.guard';

// ** Response Imports
import { WorkspaceUserResponse } from '../../../global/response/workspace-user.response';
import {
  createServerExceptionResponse,
  createUnauthorizedResponse,
} from '../../../global/response/common';

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

  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: '워크스페이스 멤버 삭제' })
  @ApiResponse(WorkspaceUserResponse.deleteWorkspaceUser[200])
  @ApiResponse(WorkspaceUserResponse.deleteWorkspaceUser[404])
  @UseGuards(JwtAccessGuard)
  @Delete('/:id')
  public async deletWorksapceUser(@Param('id') id: number) {
    return await this.workspaceUserService.deleteWorksapceUser(id);
  }

  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: '워크스페이스 멤버 조회' })
  @ApiResponse(WorkspaceUserResponse.findWorkspaceUserList[200])
  @UseGuards(JwtAccessGuard)
  @Get('/:id')
  public async findWorkspaceUserList(@Param('id') id: number) {
    return await this.workspaceUserService.findWorkspaceUserList(id);
  }

  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: '워크스페이스 초대 가능한 멤버 조회' })
  @ApiResponse(WorkspaceUserResponse.findInviteUserList[200])
  @UseGuards(JwtAccessGuard)
  @Get('/invite/:id')
  public async findInviteUserList(@Param('id') id: number) {
    return await this.workspaceUserService.findInviteUserList(id);
  }
}
