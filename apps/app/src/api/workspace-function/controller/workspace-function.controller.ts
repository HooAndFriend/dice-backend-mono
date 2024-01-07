// ** Nest Imports
import { Controller, Get, Param, UseGuards } from '@nestjs/common';

// ** Module Imports
import WorkspaceFunctionService from '../service/workspace-function.service';

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
} from '../../../response/common';
import { WorkspaceFunctionResponse } from '@/src/response/workspace-function.response';

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
  @Get('/:id')
  public async findUser(@Param('id') id: number) {
    return await this.workspaceFunctionService.findWorkspaceFunctionList(id);
  }
}
