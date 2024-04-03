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
import UserService from '../../user/service/user.service';

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
import RequestTicketSaveDto from '../dto/ticket/ticket.save.dto';
import RequestTicketUpdateDto from '../dto/ticket/ticket.update.dto';
import CommonResponse from '@/src/global/dto/api.response';
import RoleEnum from '@/src/global/enum/Role';
import Workspace from '../../workspace/domain/workspace.entity';
import RequestSettingSaveDto from '../dto/setting/setting.save.dto';
import RequestSettingUpdateDto from '../dto/setting/setting.update.dto';
import RequestTicketDueDateUpdateDto from '../dto/ticket/ticket.duedate.update.dto';
import RequestTicketUserUpdateDto from '../dto/ticket/ticket.user.update.dto';
import TicketHistoryTypeEnum from '../domain/ticket-history-log-type.enum';
import RequestTicketStatusUpdateDto from '../dto/ticket/ticket.state.update.dto';
import RequestSimpleTicketSaveDto from '../dto/ticket/ticket-simple.save.dto';

@ApiTags('Workspace Ticket')
@ApiResponse(createServerExceptionResponse())
@ApiResponse(createUnauthorizedResponse())
@Controller({ path: '/ticket', version: '1' })
export default class TicketController {
  constructor(
    private readonly ticketService: TicketService,
    private readonly userService: UserService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  @ApiBearerAuth('access-token')
  @ApiHeader({ name: 'workspace-code', required: true })
  @ApiOperation({ summary: 'TICKET 전체 조회' })
  @ApiResponse(TicketResponse.findAllTicket[200])
  @WorkspaceRole(RoleEnum.VIEWER)
  @UseGuards(WorkspaceRoleGuard)
  @UseGuards(JwtAccessGuard)
  @Get('/')
  public async findAllTicket(@GetWorkspace() { id }: Workspace) {
    const { data, count } = await this.ticketService.findAllTicket(id);

    return CommonResponse.createResponse({
      statusCode: 200,
      message: 'Ticket을 전체 조회합니다.',
      data: { data, count },
    });
  }

  @ApiBearerAuth('access-token')
  @ApiHeader({ name: 'workspace-code', required: true })
  @ApiOperation({ summary: 'TICKET 상세 조회' })
  @ApiResponse(TicketResponse.findOneTicket[200])
  @ApiResponse(TicketResponse.findOneTicket[404])
  @WorkspaceRole(RoleEnum.VIEWER)
  @UseGuards(WorkspaceRoleGuard)
  @UseGuards(JwtAccessGuard)
  @Get('/detail/:ticketId')
  public async findOneTicket(@Param('ticketId') id: number) {
    const data = await this.ticketService.findOneTicket(id);
    return CommonResponse.createResponse({
      statusCode: 200,
      message: 'Finding Tickets',
      data: { data },
    });
  }

  @ApiBearerAuth('access-token')
  @ApiHeader({ name: 'workspace-code', required: true })
  @ApiOperation({ summary: 'TICKET 생성' })
  @ApiBody({ type: RequestTicketSaveDto })
  @ApiResponse(TicketResponse.saveTicket[200])
  @ApiResponse(TicketResponse.saveTicket[400])
  @ApiResponse(TicketResponse.saveTicket[404])
  @WorkspaceRole(RoleEnum.ADMIN)
  @UseGuards(WorkspaceRoleGuard)
  @UseGuards(JwtAccessGuard)
  @Post('/')
  public async saveTicket(
    @Body() dto: RequestTicketSaveDto,
    @GetUser() user: User,
    @GetWorkspace() workspace: Workspace,
  ) {
    await this.ticketService.saveTicket(dto, user, workspace);
    return CommonResponse.createResponseMessage({
      statusCode: 200,
      message: 'Ticket을 생성합니다.',
    });
  }

  @ApiBearerAuth('access-token')
  @ApiHeader({ name: 'workspace-code', required: true })
  @ApiOperation({ summary: 'TICKET 간단 생성' })
  @ApiBody({ type: RequestSimpleTicketSaveDto })
  @ApiResponse(TicketResponse.saveSimpleTicket[200])
  @WorkspaceRole(RoleEnum.ADMIN)
  @UseGuards(WorkspaceRoleGuard)
  @UseGuards(JwtAccessGuard)
  @Post('/simple')
  public async saveSimpleTicket(
    @Body() dto: RequestSimpleTicketSaveDto,
    @GetUser() user: User,
    @GetWorkspace() workspace: Workspace,
  ) {
    await this.ticketService.saveSimpleTicket(dto, user, workspace);

    return CommonResponse.createResponseMessage({
      statusCode: 200,
      message: 'Ticket을 생성합니다.',
    });
  }

  @ApiBearerAuth('access-token')
  @ApiHeader({ name: 'workspace-code', required: true })
  @ApiOperation({ summary: 'TICKET 수정' })
  @ApiBody({ type: RequestTicketUpdateDto })
  @ApiResponse(TicketResponse.updateTicket[200])
  @ApiResponse(TicketResponse.updateTicket[400])
  @ApiResponse(TicketResponse.updateTicket[404])
  @WorkspaceRole(RoleEnum.ADMIN)
  @UseGuards(WorkspaceRoleGuard)
  @UseGuards(JwtAccessGuard)
  @Patch('/')
  public async updateTicket(
    @Body() dto: RequestTicketUpdateDto,
    @GetUser() user: User,
  ) {
    await this.ticketService.updateTicket(dto, user);
    return CommonResponse.createResponseMessage({
      statusCode: 200,
      message: 'Ticket을 수정합니다.',
    });
  }

  @ApiBearerAuth('access-token')
  @ApiHeader({ name: 'workspace-code', required: true })
  @ApiOperation({ summary: 'TICKET Due Date 수정' })
  @ApiBody({ type: RequestTicketDueDateUpdateDto })
  @ApiResponse(TicketResponse.updateTicketDueDate[200])
  @ApiResponse(TicketResponse.updateTicketDueDate[404])
  @WorkspaceRole(RoleEnum.ADMIN)
  @UseGuards(WorkspaceRoleGuard)
  @UseGuards(JwtAccessGuard)
  @Patch('/dueDate')
  public async updateTicketDueDate(@Body() dto: RequestTicketDueDateUpdateDto) {
    await this.ticketService.updateTicketDueDate(dto);
    return CommonResponse.createResponseMessage({
      statusCode: 200,
      message: 'Ticket due date를 수정합니다.',
    });
  }

  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'QA 유저 수정' })
  @ApiHeader({ name: 'workspace-code', required: true })
  @ApiBody({ type: RequestTicketUserUpdateDto })
  @ApiResponse(TicketResponse.updateTicketUser[200])
  @ApiResponse(TicketResponse.updateTicketUser[404.1])
  @ApiResponse(TicketResponse.updateTicketUser[404.2])
  @WorkspaceRole(RoleEnum.WRITER)
  @UseGuards(WorkspaceRoleGuard)
  @UseGuards(JwtAccessGuard)
  @Put('/user')
  public async updateTicketUser(@Body() dto: RequestTicketUserUpdateDto) {
    const ticket = await this.ticketService.findTicketByIdWithWorkerAndAdmin(
      dto.ticketId,
    );
    const user = await this.userService.findUserById(dto.userId);
    await this.ticketService.updateTicketUser(dto, user);

    this.eventEmitter.emit('ticket.send-change-history', {
      qaId: dto.ticketId,
      username: user.nickname,
      before:
        dto.type === 'admin' ? ticket.admin.nickname : ticket.worker.nickname,
      after: user.nickname,
      type:
        dto.type === 'admin'
          ? TicketHistoryTypeEnum.ADMIN
          : TicketHistoryTypeEnum.WORKER,
    });

    return CommonResponse.createResponseMessage({
      statusCode: 200,
      message: 'Ticket 담당자를 수정합니다.',
    });
  }

  @ApiBearerAuth('access-token')
  @ApiHeader({ name: 'workspace-code', required: true })
  @ApiOperation({ summary: 'TICKET 삭제' })
  @ApiResponse(TicketResponse.deleteTicket[200])
  @ApiResponse(TicketResponse.deleteTicket[404])
  @WorkspaceRole(RoleEnum.ADMIN)
  @UseGuards(WorkspaceRoleGuard)
  @UseGuards(JwtAccessGuard)
  @Delete('/:ticketId')
  public async deleteTicket(@Param('ticketId') id: number) {
    await this.ticketService.deleteTicket(id);
    return CommonResponse.createResponseMessage({
      statusCode: 200,
      message: 'Ticket을 삭제합니다.',
    });
  }

  @ApiBearerAuth('access-token')
  @ApiHeader({ name: 'workspace-code', required: true })
  @ApiOperation({ summary: 'TICKET 상태변경' })
  @ApiBody({ type: RequestTicketStatusUpdateDto })
  @ApiResponse(TicketResponse.updateTicketState[200])
  @ApiResponse(TicketResponse.updateTicketState[404])
  @WorkspaceRole(RoleEnum.WRITER)
  @UseGuards(WorkspaceRoleGuard)
  @UseGuards(JwtAccessGuard)
  @Put('/status')
  public async updateTicketState(@Body() dto: RequestTicketStatusUpdateDto) {
    await this.ticketService.isExistedTicketById(dto.ticketId);

    await this.ticketService.updateTicketStatus(dto);
    return CommonResponse.createResponseMessage({
      statusCode: 200,
      message: 'Ticket 상태를 변경합니다.',
    });
  }

  @ApiBearerAuth('access-token')
  @ApiHeader({ name: 'workspace-code', required: true })
  @ApiOperation({ summary: 'Setting 생성' })
  @ApiResponse(TicketResponse.saveSetting[200])
  @ApiResponse(TicketResponse.saveSetting[404])
  @WorkspaceRole(RoleEnum.ADMIN)
  @UseGuards(WorkspaceRoleGuard)
  @UseGuards(JwtAccessGuard)
  @Post('/setting')
  public async saveSetting(
    @GetWorkspace() workspace: Workspace,
    @GetUser() user: User,
    @Body() dto: RequestSettingSaveDto,
  ) {
    await this.ticketService.saveSetting(dto, workspace, user);
    return CommonResponse.createResponseMessage({
      statusCode: 200,
      message: 'Save Setting',
    });
  }

  @ApiBearerAuth('access-token')
  @ApiHeader({ name: 'workspace-code', required: true })
  @ApiOperation({ summary: 'Setting 수정' })
  @ApiResponse(TicketResponse.updateSetting[200])
  @ApiResponse(TicketResponse.updateSetting[404])
  @WorkspaceRole(RoleEnum.ADMIN)
  @UseGuards(WorkspaceRoleGuard)
  @UseGuards(JwtAccessGuard)
  @Patch('/setting')
  public async updateSetting(
    @GetWorkspace() workspace: Workspace,
    @Body() dto: RequestSettingUpdateDto,
  ) {
    await this.ticketService.updateSetting(dto, workspace);
    return CommonResponse.createResponseMessage({
      statusCode: 200,
      message: 'Update Setting',
    });
  }

  @ApiBearerAuth('access-token')
  @ApiHeader({ name: 'workspace-code', required: true })
  @ApiOperation({ summary: 'Setting 삭제' })
  @ApiResponse(TicketResponse.deleteSetting[200])
  @ApiResponse(TicketResponse.deleteSetting[404])
  @WorkspaceRole(RoleEnum.ADMIN)
  @UseGuards(WorkspaceRoleGuard)
  @UseGuards(JwtAccessGuard)
  @Delete('/setting/:settingId')
  public async deleteSetting(@Param('settingId') id: number) {
    await this.ticketService.deleteSetting(id);
    return CommonResponse.createResponseMessage({
      statusCode: 200,
      message: 'Delete Setting',
    });
  }

  @ApiBearerAuth('access-token')
  @ApiHeader({ name: 'workspace-code', required: true })
  @ApiOperation({ summary: 'Setting 전체 조회' })
  @ApiResponse(TicketResponse.findSetting[200])
  @ApiResponse(TicketResponse.findSetting[404])
  @WorkspaceRole(RoleEnum.ADMIN)
  @UseGuards(WorkspaceRoleGuard)
  @UseGuards(JwtAccessGuard)
  @Get('/setting')
  public async findAllSetting(@GetWorkspace() { id }: Workspace) {
    const [data, count] = await this.ticketService.findAllSetting(id);

    return CommonResponse.createResponse({
      data: { data, count },
      message: 'Find Settings',
      statusCode: 200,
    });
  }

  @ApiBearerAuth('access-token')
  @ApiHeader({ name: 'workspace-code', required: true })
  @ApiOperation({ summary: 'Setting 단일 조회' })
  @ApiResponse(TicketResponse.findOneSetting[200])
  @ApiResponse(TicketResponse.findOneSetting[404])
  @WorkspaceRole(RoleEnum.ADMIN)
  @UseGuards(WorkspaceRoleGuard)
  @UseGuards(JwtAccessGuard)
  @Get('/setting/:settingId')
  public async findSetting(@Param('settingId') id: number) {
    const setting = await this.ticketService.findSettingById(id);
    return CommonResponse.createResponse({
      data: setting,
      message: 'Find Setting',
      statusCode: 200,
    });
  }
}
