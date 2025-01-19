// ** Nest Imports
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';

// ** Module Imports
import TicketService from '../service/ticket.service';
import UserService from '@/src/modules/user/service/user.service';
import TicketSettingService from '../../ticket-setting/service/ticket.setting.service';

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
} from '@/src/global/response/common';
import { TicketResponse } from '@/src/global/response/ticket.response';

// ** Utils Imports
import JwtAccessGuard from '@/src/modules/auth/passport/auth.jwt-access.guard';
import { GetUser } from '@/src/global/decorators/user/user.decorators';
import { WorkspaceRoleGuard } from '@/src/global/decorators/workspace-role/workspace-role.guard';
import {
  GetWorkspace,
  WorkspaceRole,
} from '@/src/global/decorators/workspace-role/workspace-role.decorator';
import dayjs from 'dayjs';

// ** Dto Imports
import {
  RoleEnum,
  CommonResponse,
  RequestTicketHistoryLogSaveDto,
  TicketHistoryTypeEnum,
  SendPushDto,
  NotificationTypeEnum,
  NotificationStatusEnum,
} from '@hi-dice/common';
import RequestTicketDueDateUpdateDto from '../dto/ticket/ticket.duedate.update.dto';
import RequestTicketUserUpdateDto from '../dto/ticket/ticket.user.update.dto';
import RequestTicketStatusUpdateDto from '../dto/ticket/ticket.state.update.dto';
import RequestTicketSaveDto from '../dto/ticket/ticket.save.dto';
import RequestTicketSimpleUpdateDto from '../dto/ticket/ticket-simple.update.dto';
import RequestTicketSettingUpdateDto from '../dto/ticket/ticket-setting.update.dto';
import RequestTicketOrderUpdateDto from '../dto/ticket/ticket-order.update.dto';
import RequestMultiTicketStatusUpdateDto from '../dto/ticket/ticket-multi.status.dto';
import RequestMultiTicketDueDateUpdateDto from '../dto/ticket/ticket-multi.duedate.dto';
import RequestMultiTicketSettingUpdateDto from '../dto/ticket/ticket-multi.setting.dto';
import RequestTicketDeleteDto from '../dto/ticket/ticket.delete.dto';
import Workspace from '@/src/modules/workspace/domain/workspace.entity';
import User from '@/src/modules/user/domain/user.entity';
import RequestTicketEpicUpdateDto from '../dto/ticket/ticket-epic.update.dto';
import RequestTicketPriorityUpdateDto from '../dto/ticket/ticket-priority.update.dto';

@ApiTags('Workspace Ticket')
@ApiBearerAuth('access-token')
@ApiHeader({ name: 'workspace-code', required: true })
@ApiResponse(createServerExceptionResponse())
@ApiResponse(createUnauthorizedResponse())
@UseGuards(JwtAccessGuard)
@Controller({ path: '/ticket', version: '1' })
export default class TicketController {
  constructor(
    private readonly ticketService: TicketService,
    private readonly userService: UserService,
    private readonly ticketSettingService: TicketSettingService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  @ApiOperation({ summary: 'TICKET 전체 조회' })
  @ApiResponse(TicketResponse.findAllTicket[200])
  @WorkspaceRole(RoleEnum.VIEWER)
  @UseGuards(WorkspaceRoleGuard)
  @Get('/')
  public async findAllTicket(@GetWorkspace() { workspaceId }: Workspace) {
    const [data, count] = await this.ticketService.findAllTicket(workspaceId);

    return CommonResponse.createResponse({
      statusCode: 200,
      message: 'Ticket을 전체 조회합니다.',
      data: { data, count },
    });
  }

  @ApiOperation({ summary: 'TICKET 상세 조회' })
  @ApiResponse(TicketResponse.findOneTicket[200])
  @ApiResponse(TicketResponse.findOneTicket[404])
  @WorkspaceRole(RoleEnum.VIEWER)
  @UseGuards(WorkspaceRoleGuard)
  @Get('/detail/:ticketId')
  public async findOneTicket(@Param('ticketId') id: number) {
    const data = await this.ticketService.findOneTicket(id);

    return CommonResponse.createResponse({
      statusCode: 200,
      message: 'Ticket을 상세 조회 합니다.',
      data,
    });
  }

  @ApiOperation({ summary: 'TICKET 전체 조회' })
  @ApiResponse(TicketResponse.findAllTicket[200])
  @WorkspaceRole(RoleEnum.VIEWER)
  @UseGuards(WorkspaceRoleGuard)
  @Get('/my')
  public async findMyTicketList(
    @GetWorkspace() { workspaceId }: Workspace,
    @GetUser() { userId }: User,
  ) {
    const [data, count] = await this.ticketService.findMyTicketList(
      workspaceId,
      userId,
    );

    return CommonResponse.createResponse({
      statusCode: 200,
      message: '나의 Ticket을 전체 조회합니다.',
      data: { data, count },
    });
  }

  @ApiOperation({ summary: 'TICKET 통계 조회' })
  @ApiResponse(TicketResponse.findStats[200])
  @WorkspaceRole(RoleEnum.VIEWER)
  @UseGuards(WorkspaceRoleGuard)
  @Get('/stats')
  public async findStats(
    @GetWorkspace() { workspaceId }: Workspace,
    @GetUser() { userId }: User,
  ) {
    const data = await this.ticketService.findStats(workspaceId, userId);

    return CommonResponse.createResponse({
      statusCode: 200,
      message: '워크스페이스의 티켓 통계를 조회합니다.',
      data,
    });
  }

  @ApiOperation({ summary: 'TICKET 생성' })
  @ApiBody({ type: RequestTicketSaveDto })
  @ApiResponse(TicketResponse.saveTicket[200])
  @ApiResponse(TicketResponse.saveTicket[404.1])
  @ApiResponse(TicketResponse.saveTicket[404.2])
  @WorkspaceRole(RoleEnum.WRITER)
  @UseGuards(WorkspaceRoleGuard)
  @Post('/')
  public async saveTicket(
    @Body() dto: RequestTicketSaveDto,
    @GetUser() user: User,
    @GetWorkspace() workspace: Workspace,
  ) {
    const ticketSetting = await this.ticketSettingService.findTicketSettingById(
      dto.settingId,
    );

    await this.ticketService.saveTicket(dto, user, workspace, ticketSetting);

    return CommonResponse.createResponseMessage({
      statusCode: 200,
      message: 'Ticket을 생성합니다.',
    });
  }

  @ApiOperation({ summary: 'TICKET 다중 삭제' })
  @ApiResponse(TicketResponse.multiTicketDelete[200])
  @WorkspaceRole(RoleEnum.WRITER)
  @UseGuards(WorkspaceRoleGuard)
  @Patch('/multi/delete')
  public async multiTicketDelete(@Body() dto: RequestTicketDeleteDto) {
    await this.ticketService.deleteTicketList(dto);

    return CommonResponse.createResponseMessage({
      statusCode: 200,
      message: 'Ticket을 다중 삭제합니다.',
    });
  }

  @ApiOperation({ summary: 'MULTI TICKET STATUS 수정' })
  @ApiBody({ type: RequestMultiTicketStatusUpdateDto })
  @ApiResponse(TicketResponse.updateTicket[200])
  @WorkspaceRole(RoleEnum.WRITER)
  @UseGuards(WorkspaceRoleGuard)
  @Patch('/multi/status')
  public async multiTicketStatusUpdate(
    @Body() dto: RequestMultiTicketStatusUpdateDto,
  ) {
    await this.ticketService.multiTicketStatusUpdate(dto.ticketIds, dto.status);
    return CommonResponse.createResponseMessage({
      statusCode: 200,
      message: 'Ticket을 수정합니다.',
    });
  }

  @ApiOperation({ summary: 'MULTI TICKET Due Date수정' })
  @ApiBody({ type: RequestMultiTicketDueDateUpdateDto })
  @ApiResponse(TicketResponse.updateTicket[200])
  @WorkspaceRole(RoleEnum.WRITER)
  @UseGuards(WorkspaceRoleGuard)
  @Patch('/multi/due-date')
  public async multiTicketDueDateUpdate(
    @Body() dto: RequestMultiTicketDueDateUpdateDto,
  ) {
    await this.ticketService.multiTicketDueDateUpdate(
      dto.ticketIds,
      dto.dueDate,
    );

    return CommonResponse.createResponseMessage({
      statusCode: 200,
      message: 'Ticket을 수정합니다.',
    });
  }

  @ApiOperation({ summary: 'MULTI TICKET Setting 수정' })
  @ApiBody({ type: RequestMultiTicketSettingUpdateDto })
  @ApiResponse(TicketResponse.multiTicketSettingUpdate[200])
  @ApiResponse(TicketResponse.multiTicketSettingUpdate[404])
  @WorkspaceRole(RoleEnum.WRITER)
  @UseGuards(WorkspaceRoleGuard)
  @Patch('/multi/ticket-setting')
  public async multiTicketSettingUpdate(
    @Body() dto: RequestMultiTicketSettingUpdateDto,
  ) {
    const ticketSetting = await this.ticketSettingService.findTicketSettingById(
      dto.settingId,
    );

    await this.ticketService.multiTicketSettingUpdate(
      dto.ticketIds,
      ticketSetting,
    );

    return CommonResponse.createResponseMessage({
      statusCode: 200,
      message: 'Ticket을 수정합니다.',
    });
  }

  @ApiOperation({ summary: 'TICKET 간단 수정' })
  @ApiBody({ type: RequestTicketSimpleUpdateDto })
  @ApiResponse(TicketResponse.updateTicket[200])
  @ApiResponse(TicketResponse.updateTicket[404])
  @WorkspaceRole(RoleEnum.WRITER)
  @UseGuards(WorkspaceRoleGuard)
  @Patch('/')
  public async updateSimpleTicket(
    @Body() dto: RequestTicketSimpleUpdateDto,
    @GetUser() user: User,
  ) {
    const ticket = await this.ticketService.findTicketById(dto.ticketId);
    await this.ticketService.updateSimpleTicket(ticket, dto);

    this.sendTicketQueue({
      ticketId: dto.ticketId,
      creatorEmail: user.email,
      creatorProfile: user.profile,
      creatorNickname: user.nickname,
      type: this.getTicketHistoryLogEnum(dto.type),
      beforeLog:
        dto.type === 'storypoint'
          ? String(ticket.storypoint)
          : ticket[dto.type],
      afterLog: dto.value,
    });

    return CommonResponse.createResponseMessage({
      statusCode: 200,
      message: 'Ticket을 수정합니다.',
    });
  }

  @ApiOperation({ summary: 'TICKET의 SETTING 수정' })
  @ApiBody({ type: RequestTicketSettingUpdateDto })
  @ApiResponse(TicketResponse.updateTicket[200])
  @ApiResponse(TicketResponse.updateTicket[404])
  @WorkspaceRole(RoleEnum.WRITER)
  @UseGuards(WorkspaceRoleGuard)
  @Patch('/ticket-setting')
  public async updateTicketSetting(
    @Body() dto: RequestTicketSettingUpdateDto,
    @GetUser() user: User,
  ) {
    const ticket = await this.ticketService.findOne(dto.ticketId);
    const ticketSetting = await this.ticketSettingService.findTicketSettingById(
      dto.settingId,
    );

    await this.ticketService.updateTicketSetting(ticketSetting, dto.ticketId);

    this.sendTicketQueue({
      ticketId: dto.ticketId,
      creatorEmail: user.email,
      creatorProfile: user.profile,
      creatorNickname: user.nickname,
      type: TicketHistoryTypeEnum.UPDATE_TYPE,
      beforeLog: ticket.ticketSetting.name,
      afterLog: ticketSetting.name,
    });

    return CommonResponse.createResponseMessage({
      statusCode: 200,
      message: 'Ticket을 수정합니다.',
    });
  }

  @ApiOperation({ summary: 'TICKET Due Date 수정' })
  @ApiBody({ type: RequestTicketDueDateUpdateDto })
  @ApiResponse(TicketResponse.updateTicketDueDate[200])
  @ApiResponse(TicketResponse.updateTicketDueDate[404])
  @WorkspaceRole(RoleEnum.WRITER)
  @UseGuards(WorkspaceRoleGuard)
  @Patch('/dueDate')
  public async updateTicketDueDate(
    @Body() dto: RequestTicketDueDateUpdateDto,
    @GetUser() user: User,
  ) {
    const ticket = await this.ticketService.findTicketById(dto.ticketId);

    await this.ticketService.updateTicketDueDate(dto);

    this.sendTicketQueue({
      ticketId: dto.ticketId,
      creatorEmail: user.email,
      creatorProfile: user.profile,
      creatorNickname: user.nickname,
      type: TicketHistoryTypeEnum.UPDATE_DUE_DATE,
      beforeLog: ticket.dueDate
        ? dayjs(ticket.dueDate).format('YYYY-MM-DD')
        : '없음',
      afterLog: dto.dueDate ? dayjs(dto.dueDate).format('YYYY-MM-DD') : '없음',
    });

    return CommonResponse.createResponseMessage({
      statusCode: 200,
      message: 'Ticket due date를 수정합니다.',
    });
  }

  @ApiOperation({ summary: 'TICKET 우선 순위 수정' })
  @ApiBody({ type: RequestTicketPriorityUpdateDto })
  @ApiResponse(TicketResponse.updateTicketDueDate[200])
  @ApiResponse(TicketResponse.updateTicketDueDate[404])
  @WorkspaceRole(RoleEnum.WRITER)
  @UseGuards(WorkspaceRoleGuard)
  @Patch('/dueDate')
  public async updateTicketPriority(
    @Body() dto: RequestTicketPriorityUpdateDto,
  ) {
    const ticket = await this.ticketService.findTicketById(dto.ticketId);

    await this.ticketService.updateTicketPriority(ticket, dto.priority);

    return CommonResponse.createResponseMessage({
      statusCode: 200,
      message: 'Ticket를 수정합니다.',
    });
  }

  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'TICKET 유저 수정' })
  @ApiHeader({ name: 'workspace-code', required: true })
  @ApiBody({ type: RequestTicketUserUpdateDto })
  @ApiResponse(TicketResponse.updateTicketUser[200])
  @ApiResponse(TicketResponse.updateTicketUser[404.1])
  @ApiResponse(TicketResponse.updateTicketUser[404.2])
  @WorkspaceRole(RoleEnum.WRITER)
  @UseGuards(WorkspaceRoleGuard)
  @Put('/user')
  public async updateTicketUser(
    @GetUser() user: User,
    @Body() dto: RequestTicketUserUpdateDto,
  ) {
    const ticket = await this.ticketService.findTicketByIdWithWorkerAndAdmin(
      dto.ticketId,
    );
    const saveUser = await this.userService.findUserById(dto.userId);
    await this.ticketService.updateTicketUser(ticket, dto.type, saveUser);

    this.sendTicketQueue({
      ticketId: ticket.ticketId,
      creatorEmail: user.email,
      creatorProfile: user.profile,
      creatorNickname: user.nickname,
      type:
        dto.type === 'admin'
          ? TicketHistoryTypeEnum.UPDATE_ADMIN
          : TicketHistoryTypeEnum.UPDATE_WORKER,
      beforeNickname:
        dto.type === 'admin'
          ? ticket?.admin?.nickname || null
          : ticket?.worker?.nickname || null,
      beforeEmail:
        dto.type === 'admin'
          ? ticket?.admin?.email || null
          : ticket?.worker?.email || null,
      beforeProfile:
        dto.type === 'admin'
          ? ticket?.admin?.profile || null
          : ticket?.worker?.profile || null,
      afterEmail: saveUser.email,
      afterNickname: saveUser.nickname,
      afterProfile: saveUser.profile,
    });

    return CommonResponse.createResponseMessage({
      statusCode: 200,
      message: 'Ticket 담당자를 수정합니다.',
    });
  }

  @ApiOperation({ summary: 'TICKET 삭제' })
  @ApiResponse(TicketResponse.deleteTicket[200])
  @ApiResponse(TicketResponse.deleteTicket[404])
  @WorkspaceRole(RoleEnum.WRITER)
  @UseGuards(WorkspaceRoleGuard)
  @Delete('/:ticketId')
  public async deleteTicket(@Param('ticketId') id: number) {
    await this.ticketService.deleteTicket(id);
    return CommonResponse.createResponseMessage({
      statusCode: 200,
      message: 'Ticket을 삭제합니다.',
    });
  }

  @ApiOperation({ summary: 'TICKET Order 변경' })
  @ApiBody({ type: RequestTicketOrderUpdateDto })
  @ApiResponse(TicketResponse.updateTicketState[200])
  @ApiResponse(TicketResponse.updateTicketState[404])
  @WorkspaceRole(RoleEnum.WRITER)
  @UseGuards(WorkspaceRoleGuard)
  @Patch('/order')
  public async updateTicketOrder(
    @Body() dto: RequestTicketOrderUpdateDto,
    @GetWorkspace() { workspaceId }: Workspace,
  ) {
    const ticket = await this.ticketService.findTicketById(dto.ticketId);
    const targetTicket = await this.ticketService.findTicketById(
      dto.targetTicketId,
    );

    await this.ticketService.updateTicketOrder(
      ticket,
      targetTicket.orderId,
      workspaceId,
    );
    return CommonResponse.createResponseMessage({
      statusCode: 200,
      message: 'Ticket 정렬을 변경합니다.',
    });
  }

  @ApiOperation({ summary: 'TICKET 상태변경' })
  @ApiBody({ type: RequestTicketStatusUpdateDto })
  @ApiResponse(TicketResponse.updateTicketState[200])
  @ApiResponse(TicketResponse.updateTicketState[404])
  @WorkspaceRole(RoleEnum.WRITER)
  @UseGuards(WorkspaceRoleGuard)
  @Put('/status')
  public async updateTicketState(
    @Body() dto: RequestTicketStatusUpdateDto,
    @GetUser() user: User,
  ) {
    const ticket = await this.ticketService.findTicketById(dto.ticketId);

    await this.ticketService.updateTicketStatus(dto);

    this.sendTicketQueue({
      ticketId: dto.ticketId,
      creatorEmail: user.email,
      creatorProfile: user.profile,
      creatorNickname: user.nickname,
      type: TicketHistoryTypeEnum.UPDATE_STATUS,
      beforeLog: ticket.status,
      afterLog: dto.status,
    });

    this.sendPush({
      fcmToken: ticket?.worker?.fcmToken,
      email: ticket?.worker?.email,
      title: 'Ticket 상태 변경',
      body: `Ticket 상태가 ${dto.status}로 변경`,
      status: NotificationStatusEnum.UNREAD,
      type: NotificationTypeEnum.TICKET,
      subId: dto.ticketId,
    });

    return CommonResponse.createResponseMessage({
      statusCode: 200,
      message: 'Ticket 상태를 변경합니다.',
    });
  }

  @ApiOperation({ summary: 'TICKET Epic 변경' })
  @ApiBody({ type: RequestTicketEpicUpdateDto })
  @ApiResponse(TicketResponse.updateTicketState[200])
  @ApiResponse(TicketResponse.updateTicketState[404])
  @WorkspaceRole(RoleEnum.WRITER)
  @UseGuards(WorkspaceRoleGuard)
  @Patch('/epic')
  public async updateTicketEpic(
    @Body() dto: RequestTicketEpicUpdateDto,
    @GetWorkspace() { workspaceId }: Workspace,
  ) {
    await this.ticketService.updateTicketEpic(
      dto.ticketId,
      dto.epicId,
      workspaceId,
    );

    return CommonResponse.createResponseMessage({
      statusCode: 200,
      message: 'Ticket Epic을 변경합니다.',
    });
  }

  /**
   * Send Ticket Queue
   * @param event
   */
  private sendTicketQueue(event: RequestTicketHistoryLogSaveDto) {
    this.eventEmitter.emit('ticket.send-change-history', event);
  }

  /**
   * 푸시 발송
   */
  private sendPush(event: SendPushDto) {
    this.eventEmitter.emit('push.send-web-push', event);
  }

  /**
   * Get Ticket History Log Enum
   * @param type
   * @returns
   */
  private getTicketHistoryLogEnum(type: 'content' | 'name' | 'storypoint') {
    if (type === 'content') {
      return TicketHistoryTypeEnum.UPDATE_COMMENT;
    }

    if (type === 'name') {
      return TicketHistoryTypeEnum.UPDATE_NAME;
    }

    if (type === 'storypoint') {
      return TicketHistoryTypeEnum.UPDATE_SP;
    }
  }
}
