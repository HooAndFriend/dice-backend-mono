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

// ** Response Imports
import {
  createServerExceptionResponse,
  createUnauthorizedResponse,
} from '@/src/global/response/common';
import { CommonResponse, RoleEnum } from '@hi-dice/common';
import {
  GetWorkspace,
  WorkspaceRole,
} from '@/src/global/decorators/workspace-role/workspace-role.decorator';
import { WorkspaceRoleGuard } from '@/src/global/decorators/workspace-role/workspace-role.guard';
import JwtAccessGuard from '@/src/modules/auth/passport/auth.jwt-access.guard';
import RequestSprintUpdateDto, {
  RequestSprintStatusUpdateDto,
} from '../dto/sprint.update.dto';
import { SprintResponse } from '@/src/global/response/sprint.response';
import RequestSprintSaveDto from '../dto/sprint.save.dto';
import Workspace from '@/src/modules/workspace/domain/workspace.entity';
import RequestSprintSaveTicketDto from '../dto/sprint.save.ticket.dto';

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
  @WorkspaceRole(RoleEnum.WRITER)
  @UseGuards(WorkspaceRoleGuard)
  @UseGuards(JwtAccessGuard)
  @Post('/')
  public async saveSprint(
    @Body() dto: RequestSprintSaveDto,
    @GetWorkspace() workspace: Workspace,
  ) {
    await this.sprintService.saveSprint(dto, workspace);

    return CommonResponse.createResponseMessage({
      statusCode: 200,
      message: 'Sprint를 생성합니다.',
    });
  }

  //하위 티켓 추가
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: '하위 tickets 추가' })
  @ApiHeader({ name: 'workspace-code', required: true })
  @ApiResponse(SprintResponse.saveSprintToTicket[200])
  @WorkspaceRole(RoleEnum.WRITER)
  @UseGuards(WorkspaceRoleGuard)
  @UseGuards(JwtAccessGuard)
  @Post('/ticket')
  public async saveTicketToSprint(@Body() dto: RequestSprintSaveTicketDto) {
    const sprintId = dto.sprintId;

    await this.sprintService.saveTicketToSprint(dto, sprintId);

    return CommonResponse.createResponseMessage({
      statusCode: 200,
      message: 'Sprint에 티켓을 추가합니다.',
    });
  }

  //스프린트 수정
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Sprint 수정' })
  @ApiHeader({ name: 'workspace-code', required: true })
  @ApiResponse(SprintResponse.updateSprint[200])
  @ApiResponse(SprintResponse.updateSprint[404])
  @WorkspaceRole(RoleEnum.WRITER)
  @UseGuards(WorkspaceRoleGuard)
  @UseGuards(JwtAccessGuard)
  @Put('/')
  public async updateSprint(@Body() dto: RequestSprintUpdateDto) {
    await this.sprintService.updateSprint(dto);

    return CommonResponse.createResponseMessage({
      statusCode: 200,
      message: 'Sprint를 수정합니다.',
    });
  }

  //스프린트 단일 조회
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Sprint 조회' })
  @ApiHeader({ name: 'workspace-code', required: true })
  @ApiResponse(SprintResponse.findSprint[200])
  @WorkspaceRole(RoleEnum.VIEWER)
  @UseGuards(WorkspaceRoleGuard)
  @UseGuards(JwtAccessGuard)
  @Get('/:sprintId')
  public async findSprint(@Param('sprintId') sprintId: number) {
    const sprint = await this.sprintService.findSprint(sprintId);

    return CommonResponse.createResponse({
      statusCode: 200,
      message: 'Sprint를 조회합니다.',
      data: {
        title: sprint.title,
        startDate: sprint.startDate,
        endDate: sprint.endDate,
        description: sprint.description,
      },
    });
  }

  //스프린트 리스트 조회
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'SprintList 조회' })
  @ApiHeader({ name: 'workspace-code', required: true })
  @ApiResponse(SprintResponse.findSprint[200])
  @WorkspaceRole(RoleEnum.VIEWER)
  @UseGuards(WorkspaceRoleGuard)
  @UseGuards(JwtAccessGuard)
  @Get('/')
  async findSprintList() {
    const result = await this.sprintService.findSprintList();
    return {
      statusCode: 200,
      message: '스프린트 리스트를 조회합니다.',
      data: result,
    };
  }

  //스프린트 삭제
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

  //하위 티켓 삭제
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: '하위 tickets 삭제' })
  @ApiHeader({ name: 'workspace-code', required: true })
  @ApiResponse(SprintResponse.deleteSprint[200])
  @ApiResponse(SprintResponse.deleteSprint[404])
  @WorkspaceRole(RoleEnum.WRITER)
  @UseGuards(WorkspaceRoleGuard)
  @UseGuards(JwtAccessGuard)
  @Delete('ticket/:sprintId')
  public async deleteTicketInSprint(@Param('sprintId') sprintId: number) {
    await this.sprintService.deleteTicketInSprint(sprintId);

    return CommonResponse.createResponseMessage({
      statusCode: 200,
      message: '해당 Sprint의 하위 티켓들을 삭제합니다.',
    });
  }

  //스프린트 status 수정
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Sprint Status 수정' })
  @ApiHeader({ name: 'workspace-code', required: true })
  @ApiResponse(SprintResponse.updateSprint[200])
  @ApiResponse(SprintResponse.updateSprint[404])
  @WorkspaceRole(RoleEnum.WRITER)
  @UseGuards(WorkspaceRoleGuard)
  @UseGuards(JwtAccessGuard)
  @Put('/status')
  public async updateSprintStatus(@Body() dto: RequestSprintStatusUpdateDto) {
    await this.sprintService.updateSprintStatus(dto);

    return CommonResponse.createResponseMessage({
      statusCode: 200,
      message: 'Sprint 상태를 수정합니다.',
    });
  }
}
