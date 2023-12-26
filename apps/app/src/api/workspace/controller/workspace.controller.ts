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
import WorkspaceService from '../service/workspace.service';

// ** Swagger Imports
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

// ** Dto Imports
import RequestWorkspaceSaveDto from '../dto/workspace.save.dto';
import RequestWorkspaceUpdateDto from '../dto/workspace.update.dto';
import User from '../../user/domain/user.entity';

// ** Utils Imports
import JwtAccessGuard from '../../auth/passport/auth.jwt-access.guard';
import { GetUser } from '../../../common/decorators/user.decorators';

// ** Response Imports
import { WorkspaceResponse } from '../../../response/workspace.response';
import {
  createServerExceptionResponse,
  createUnauthorizedResponse,
} from '../../../response/common';

@ApiTags('Workspace')
@ApiResponse(createServerExceptionResponse())
@ApiResponse(createUnauthorizedResponse())
@Controller({ path: '/workspace', version: '1' })
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
    @GetUser() user: User,
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

  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: '워크스페이스 조회' })
  @ApiResponse(WorkspaceResponse.findWorkspace[200])
  @ApiResponse(WorkspaceResponse.findWorkspace[404])
  @UseGuards(JwtAccessGuard)
  @Get('/:id')
  public async findWorkspace(@Param('id') id: number) {
    return await this.workspaceService.findWorkspace(id);
  }

  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: '워크스페이스 메인 조회' })
  @ApiResponse(WorkspaceResponse.findWorkspaceMain[200])
  @ApiResponse(WorkspaceResponse.findWorkspaceMain[404])
  @UseGuards(JwtAccessGuard)
  @Get('/home/:id')
  public async findMainWorkspace(@Param('id') id: number) {
    return await this.workspaceService.findMainWorkspace(id);
  }
}
