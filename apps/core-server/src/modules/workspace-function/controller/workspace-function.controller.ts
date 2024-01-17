// ** Nest Imports
import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';

// ** Module Imports
import WorkspaceFunctionService from '../service/workspace-function.service';

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
import {
  createServerExceptionResponse,
  createUnauthorizedResponse,
} from '../../../global/response/common';
import { WorkspaceFunctionResponse } from '@/src/global/response/workspace-function.response';

// ** Dto Imports
import RequestSaveWorkspaceFunctionDto from '../dto/workspace-function.save.dto';

@ApiTags('Workspace Function')
@ApiResponse(createServerExceptionResponse())
@ApiResponse(createUnauthorizedResponse())
@Controller({ path: '/workspace-function', version: '1' })
export default class WorkspaceFunctionController {
  constructor(
    private readonly workspaceFunctionService: WorkspaceFunctionService,
  ) {}

  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: '워크스페이스 기능 리스트 조회' })
  @ApiResponse(WorkspaceFunctionResponse.findWorkspaceFunctionList[200])
  @UseGuards(JwtAccessGuard)
  @Get('/function/:id')
  public async findWorkspaceFunctionList(@Param('id') id: number) {
    return await this.workspaceFunctionService.findWorkspaceFunctionList(id);
  }

  @ApiBearerAuth('access-token')
  @ApiBody({ type: RequestSaveWorkspaceFunctionDto })
  @ApiOperation({ summary: '워크스페이스 기능 저장' })
  @ApiResponse(WorkspaceFunctionResponse.saveWorkspaceFunction[200])
  @ApiResponse(WorkspaceFunctionResponse.saveWorkspaceFunction[400])
  @ApiResponse(WorkspaceFunctionResponse.saveWorkspaceFunction[404])
  @UseGuards(JwtAccessGuard)
  @Post()
  public async saveWorkspaceFunction(
    @Body() dto: RequestSaveWorkspaceFunctionDto,
  ) {
    return await this.workspaceFunctionService.saveWorkspaceFunction(dto);
  }

  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: '워크스페이스의 기능 리스트 조회' })
  @ApiResponse(WorkspaceFunctionResponse.findFunctionList[200])
  @UseGuards(JwtAccessGuard)
  @Get('/:id')
  public async findFunctionList(@Param('id') id: number) {
    return await this.workspaceFunctionService.findFunctionList(id);
  }
}