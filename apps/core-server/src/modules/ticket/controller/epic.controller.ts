// ** Nest Imports
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';

// ** Module Imports
import TicketService from '../service/ticket.service';

// ** Swagger Imports
import {
  ApiBearerAuth,
  ApiBody,
  ApiHeader,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

// ** Response Imports
import {
  createServerExceptionResponse,
  createUnauthorizedResponse,
} from '../../../global/response/common';
import { TicketResponse } from '@/src/global/response/ticket.response';

// ** Utils Imports
import JwtAccessGuard from '../../auth/passport/auth.jwt-access.guard';
import { GetUser } from '../../../global/decorators/user/user.decorators';
import { WorkspaceRoleGuard } from '@/src/global/decorators/workspace-role/workspace-role.guard';
import {
  GetWorkspace,
  WorkspaceRole,
} from '@/src/global/decorators/workspace-role/workspace-role.decorator';

// ** Dto Imports
import User from '../../user/domain/user.entity';
import RequestEpicUpdateDto from '../dto/epic/epic.update.dto';
import RequestEpicSaveDto from '../dto/epic/epic.save.dto';
import CommonResponse from '@/src/global/dto/api.response';
import RoleEnum from '@/src/global/enum/Role';
import Workspace from '../../workspace/domain/workspace.entity';
import RequestEpicDueDateUpdateDto from '../dto/epic/epic-duedate.dto';
import RequestEpicFindDto from '../dto/epic/epic.find.dto';
import RequestEpicOrderUpdateDto from '../dto/epic/epic-order.update.dto';
import EpicService from '../service/epic.service';

@ApiTags('Epic')
@ApiResponse(createServerExceptionResponse())
@ApiResponse(createUnauthorizedResponse())
@Controller({ path: '/epic', version: '1' })
export default class EpicController {
  constructor(
    private readonly ticketService: TicketService,
    private readonly epicService: EpicService,
  ) {}

  @ApiBearerAuth('access-token')
  @ApiHeader({ name: 'workspace-code', required: true })
  @ApiOperation({ summary: 'EPIC 리스트 조회' })
  @ApiResponse(TicketResponse.findAllEpic[200])
  @WorkspaceRole(RoleEnum.VIEWER)
  @UseGuards(WorkspaceRoleGuard)
  @UseGuards(JwtAccessGuard)
  @Get('/')
  public async findAllEpic(
    @GetWorkspace() { id }: Workspace,
    @Query(ValidationPipe) query: RequestEpicFindDto,
  ) {
    const { data, count } = await this.ticketService.findAllEpic(id, query);

    return CommonResponse.createResponse({
      statusCode: 200,
      message: 'Epic을 전체 조회합니다.',
      data: { data, count },
    });
  }

  @ApiBearerAuth('access-token')
  @ApiHeader({ name: 'workspace-code', required: true })
  @ApiOperation({ summary: 'EPIC 상세조회' })
  @ApiResponse(TicketResponse.findOneEpic[200])
  @ApiResponse(TicketResponse.findOneEpic[404])
  @WorkspaceRole(RoleEnum.VIEWER)
  @UseGuards(WorkspaceRoleGuard)
  @UseGuards(JwtAccessGuard)
  @Get('/:epicId')
  public async findOneEpic(@Param('epicId') id: number) {
    const { data, count } = await this.ticketService.findOneEpic(id);

    return CommonResponse.createResponse({
      statusCode: 200,
      message: 'Epic을 상세 조회합니다.',
      data: { data, count },
    });
  }

  @ApiBearerAuth('access-token')
  @ApiHeader({ name: 'workspace-code', required: true })
  @ApiOperation({ summary: 'EPIC 생성' })
  @ApiBody({ type: RequestEpicSaveDto })
  @ApiResponse(TicketResponse.saveEpic[200])
  @ApiResponse(TicketResponse.saveEpic[400])
  @WorkspaceRole(RoleEnum.WRITER)
  @UseGuards(WorkspaceRoleGuard)
  @UseGuards(JwtAccessGuard)
  @Post('/')
  public async saveEpic(
    @Body() dto: RequestEpicSaveDto,
    @GetUser() user: User,
    @GetWorkspace() workspace: Workspace,
  ) {
    await this.epicService.saveEpic(dto, workspace, user);
    return CommonResponse.createResponseMessage({
      statusCode: 200,
      message: 'Epic을 생성합니다.',
    });
  }

  @ApiBearerAuth('access-token')
  @ApiHeader({ name: 'workspace-code', required: true })
  @ApiOperation({ summary: 'EPIC 수정' })
  @ApiBody({ type: RequestEpicUpdateDto })
  @ApiResponse(TicketResponse.updateEpic[200])
  @ApiResponse(TicketResponse.updateEpic[400])
  @ApiResponse(TicketResponse.updateEpic[404])
  @WorkspaceRole(RoleEnum.WRITER)
  @UseGuards(WorkspaceRoleGuard)
  @UseGuards(JwtAccessGuard)
  @Patch('/')
  public async updateEpic(@Body() dto: RequestEpicUpdateDto) {
    await this.epicService.isExistedEpicById(dto.epicId);
    await this.epicService.updateEpic(dto);

    return CommonResponse.createResponseMessage({
      statusCode: 200,
      message: 'Epic을 수정합니다.',
    });
  }

  @ApiBearerAuth('access-token')
  @ApiHeader({ name: 'workspace-code', required: true })
  @ApiOperation({ summary: 'EPIC Order 수정' })
  @ApiBody({ type: RequestEpicOrderUpdateDto })
  @ApiResponse(TicketResponse.updateEpic[200])
  @ApiResponse(TicketResponse.updateEpic[404])
  @WorkspaceRole(RoleEnum.WRITER)
  @UseGuards(WorkspaceRoleGuard)
  @UseGuards(JwtAccessGuard)
  @Patch('/order')
  public async updateEpicOrder(
    @Body() dto: RequestEpicOrderUpdateDto,
    @GetWorkspace() { id }: Workspace,
  ) {
    const epic = await this.epicService.findEpicById(dto.epicId);
    const targetEpic = await this.epicService.findEpicById(dto.targetEpicId);

    await this.epicService.updateEpicOrder(epic, targetEpic.orderId, id);

    return CommonResponse.createResponseMessage({
      statusCode: 200,
      message: 'Epic을 수정합니다.',
    });
  }

  @ApiBearerAuth('access-token')
  @ApiHeader({ name: 'workspace-code', required: true })
  @ApiOperation({ summary: 'EPIC Due Date 수정' })
  @ApiBody({ type: RequestEpicDueDateUpdateDto })
  @ApiResponse(TicketResponse.updateDueDateEpic[200])
  @ApiResponse(TicketResponse.updateDueDateEpic[400])
  @ApiResponse(TicketResponse.updateDueDateEpic[404])
  @WorkspaceRole(RoleEnum.WRITER)
  @UseGuards(WorkspaceRoleGuard)
  @UseGuards(JwtAccessGuard)
  @Patch('/dueDate')
  public async updateDueDateEpic(@Body() dto: RequestEpicDueDateUpdateDto) {
    await this.epicService.isExistedEpicById(dto.epicId);
    await this.epicService.updateEpicDueDate(dto);

    return CommonResponse.createResponseMessage({
      statusCode: 200,
      message: 'Epic을 수정합니다.',
    });
  }

  @ApiBearerAuth('access-token')
  @ApiHeader({ name: 'workspace-code', required: true })
  @ApiOperation({ summary: 'EPIC 삭제' })
  @ApiResponse(TicketResponse.deleteEpic[200])
  @ApiResponse(TicketResponse.deleteEpic[404])
  @WorkspaceRole(RoleEnum.WRITER)
  @UseGuards(WorkspaceRoleGuard)
  @UseGuards(JwtAccessGuard)
  @Delete('/:epicId')
  public async deleteEpic(@Param('epicId') id: number) {
    await this.epicService.isExistedEpicById(id);
    await this.epicService.deleteEpicById(id);

    return CommonResponse.createResponseMessage({
      statusCode: 200,
      message: 'Epic을 삭제합니다.',
    });
  }
}
