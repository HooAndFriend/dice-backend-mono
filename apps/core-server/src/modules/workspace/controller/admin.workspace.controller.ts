// ** Nest Imports
import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Query,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';

// ** Module Imports
import WorkspaceService from '../service/workspace.service';

// ** Swagger Imports
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

// ** Utils Imports
import JwtAccessGuard from '../../auth/passport/auth.jwt-access.guard';

// ** Response Imports

import {
  createServerExceptionResponse,
  createUnauthorizedResponse,
} from '../../../global/response/common';
import { WorkspaceResponse } from '@/src/global/response/workspace.response';

// ** Dto Imports
import { CommonResponse } from '@hi-dice/common';
import RequestWorkspaceFindDto from '../dto/workspace.find.dto';

@ApiTags('Admin Workspace')
@ApiResponse(createServerExceptionResponse())
@ApiResponse(createUnauthorizedResponse())
@Controller({ path: '/admin/workspace', version: '1' })
export default class AdminWorkspaceController {
  constructor(private readonly workspaceService: WorkspaceService) {}

  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: '워크스페이스 리스트 조회' })
  @ApiResponse(WorkspaceResponse.findWorkspaceList[200])
  @UseGuards(JwtAccessGuard)
  @Get('/')
  public async findWorkspaceList(
    @Query(ValidationPipe) dto: RequestWorkspaceFindDto,
  ) {
    const data = await this.workspaceService.findWorkspaceList(dto);

    return CommonResponse.createResponse({
      data: { data, count: data.length },
      statusCode: 200,
      message: '워크스페이스 리스트를 조회합니다.',
    });
  }

  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: '워크스페이스 조회' })
  @ApiResponse(WorkspaceResponse.findWorkspace[200])
  @ApiResponse(WorkspaceResponse.findWorkspace[404])
  @UseGuards(JwtAccessGuard)
  @Get('/:workspaceid')
  public async findWorkspace(
    @Param('workspaceid', ParseIntPipe) workspaceid: number,
  ) {
    const workspace = await this.workspaceService.findWorksapceById(
      workspaceid,
    );

    return CommonResponse.createResponse({
      data: {
        id: workspace.workspaceId,
        name: workspace.name,
        profile: workspace.profile,
        comment: workspace.comment,
        createdId: workspace.createdId,
        createdDate: workspace.createdDate,
        userCount: workspace.workspaceUser.length,
      },
      statusCode: 200,
      message: '워크스페이스를 조회합니다.',
    });
  }
}
