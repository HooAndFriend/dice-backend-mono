// ** Nest Imports
import { Body, Controller, Post, UseGuards } from '@nestjs/common';

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

// ** Response Imports
import {
  createServerExceptionResponse,
  createUnauthorizedResponse,
} from '@/src/global/response/common';
import RequestSprintSaveDto from '../dto/sprint.save.dto';
import { CommonResponse, RoleEnum } from '@hi-dice/common';
import { WorkspaceRole } from '@/src/global/decorators/workspace-role/workspace-role.decorator';
import { WorkspaceRoleGuard } from '@/src/global/decorators/workspace-role/workspace-role.guard';
import JwtAccessGuard from '@/src/modules/auth/passport/auth.jwt-access.guard';
import { SprintResponse } from '@/src/global/response/sprint.response';

@ApiTags('Ticket Sprint')
@ApiResponse(createServerExceptionResponse())
@ApiResponse(createUnauthorizedResponse())
@Controller({ path: '/ticket/sprint', version: '1' })
export default class SprintController {
  constructor(private readonly sprintService: SprintService) {}

  //스프린트 생성
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Sprint 생성' })
  @ApiHeader({ name: 'workspace-code', required: true })
  @ApiResponse(SprintResponse.saveSprint[200])
  @WorkspaceRole(RoleEnum.ADMIN)
  @UseGuards(WorkspaceRoleGuard)
  @UseGuards(JwtAccessGuard)
  @Post('/')
  public async saveSprint(@Body() dto: RequestSprintSaveDto) {
    await this.sprintService.saveSprint(dto);

    return CommonResponse.createResponse({
      statusCode: 200,
      message: 'Sprint를 생성합니다.',
      data: {},
    });
  }

  //스프린트 업데이트
}
