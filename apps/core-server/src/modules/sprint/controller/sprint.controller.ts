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
import SprintService from '../service/sprint.service';

// ** Swagger Imports
import {
  ApiBearerAuth,
  ApiHeader,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

// ** Utils Imports
import JwtAccessGuard from '../../auth/passport/auth.jwt-access.guard';
import {
  GetWorkspace,
  WorkspaceRole,
} from '@/src/global/decorators/workspace-role/workspace-role.decorator';
import { WorkspaceRoleGuard } from '@/src/global/decorators/workspace-role/workspace-role.guard';

// ** Response Imports
import {
  createServerExceptionResponse,
  createUnauthorizedResponse,
} from '../../../global/response/common';
import { SprintResponse } from '@/src/global/response/sprint.response';

// ** Dto Imports
import RequestSprintSaveDto from '../dto/sprint.save.dto';
// ** Entity Imports
import Workspace from '../../workspace/domain/workspace.entity';
// ** Emum Imports
import { CommonResponse, RoleEnum } from '@repo/common';
import RequestSprintUpdateDto from '../dto/sprint.update.dto';

@ApiTags('SPRINT')
@ApiResponse(createServerExceptionResponse())
@ApiResponse(createUnauthorizedResponse())
@Controller({ path: '/sprint', version: '1' })
export default class SprintController {
  constructor(private readonly sprintService: SprintService) {}

  //sprint 생성
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Sprint 생성' })
  @ApiHeader({ name: 'workspace-code', required: true })
  @ApiResponse(SprintResponse.saveSprint[200])
  @WorkspaceRole(RoleEnum.ADMIN)
  @UseGuards(WorkspaceRoleGuard)
  @UseGuards(JwtAccessGuard)
  @Post('/')
  public async saveSprint(
    @Body() dto: RequestSprintSaveDto,
    @GetWorkspace() workspace: Workspace,
  ) {
    await this.sprintService.saveSprint(dto, workspace);

    return CommonResponse.createResponse({
      statusCode: 200,
      message: 'Sprint를 생성합니다.',
      data: {},
    });
  }

  //sprint 조회
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Sprint 조회' })
  @ApiHeader({ name: 'workspace-code', required: true })
  @ApiResponse(SprintResponse.findSprint[200])
  @WorkspaceRole(RoleEnum.VIEWER)
  @UseGuards(WorkspaceRoleGuard)
  @UseGuards(JwtAccessGuard)
  @Get('/:sprintId')
  public async findSprint(
    @Param('sprintId') sprintId: number,
    @GetWorkspace() workspace: Workspace,
  ) {
    const sprint = await this.sprintService.findSprint(sprintId, workspace.id);

    return CommonResponse.createResponse({
      statusCode: 200,
      message: 'Sprint를 조회합니다.',
      data: sprint,
    });
  }
  //sprint 수정
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Sprint 수정' })
  @ApiHeader({ name: 'workspace-code', required: true })
  @ApiResponse(SprintResponse.updateSprint[200])
  @ApiResponse(SprintResponse.updateSprint[404])
  @WorkspaceRole(RoleEnum.VIEWER)
  @UseGuards(WorkspaceRoleGuard)
  @UseGuards(JwtAccessGuard)
  @Put('/')
  public async updateSprint(
    @Body() dto: RequestSprintUpdateDto,
    @GetWorkspace() workspace: Workspace,
  ) {
    await this.sprintService.updateSprint(dto, workspace);

    return CommonResponse.createResponseMessage({
      statusCode: 200,
      message: 'Sprint를 수정합니다.',
    });
  }
  //sprint 삭제
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Sprint 삭제' })
  @ApiHeader({ name: 'workspace-code', required: true })
  @ApiResponse(SprintResponse.deleteSprint[200])
  @ApiResponse(SprintResponse.deleteSprint[404])
  @WorkspaceRole(RoleEnum.WRITER)
  @UseGuards(WorkspaceRoleGuard)
  @UseGuards(JwtAccessGuard)
  @Delete('/:sprintId')
  public async deleteSprint(@Param('sprintId') sprintId: number) {
    await this.sprintService.deleteSprint(sprintId);

    return CommonResponse.createResponseMessage({
      statusCode: 200,
      message: 'Sprint를 삭제합니다.',
    });
  }
  //sprint 리스트 조회
  //sprint에 티켓 추가
  //sprint에 티켓 제거
}
