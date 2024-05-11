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
  Query,
  UseGuards,
} from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';

// ** Module Imports
import QaService from '../service/qa.service';
import QaCommentService from '../service/qa.comment.service';
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

// ** Utils Imports
import JwtAccessGuard from '../../auth/passport/auth.jwt-access.guard';
import {
  GetWorkspace,
  WorkspaceRole,
} from '@/src/global/decorators/workspace-role/workspace-role.decorator';
import { WorkspaceRoleGuard } from '@/src/global/decorators/workspace-role/workspace-role.guard';
import { GetUser } from '@/src/global/decorators/user/user.decorators';

// ** Response Imports
import { QaResponse } from '../../../global/response/qa.response';
import {
  createServerExceptionResponse,
  createUnauthorizedResponse,
} from '../../../global/response/common';

// ** Dto Imports
import RequestQaUpdateDto from '../dto/qa.update.dto';
import RequestQaStatusUpdateDto from '../dto/qa.status.update.dto';
import RequestQaFindDto from '../dto/qa.find.dto';

// ** Entity Imports
import User from '../../user/domain/user.entity';
import Workspace from '../../workspace/domain/workspace.entity';

// ** Emum Imports
import {
  RoleEnum,
  NotificationStatusEnum,
  NotificationTypeEnum,
  CommonResponse,
  RequestQaHistoryLogSaveDto,
  QaHistoryTypeEnum,
} from '@hi-dice/common';
import RequestSimpleQaSaveDto from '../dto/qa-simple.save';
import RequestQaUserUpdateDto from '../dto/qa.user.update.dto';
import RequestQaDueDateUpdateDto from '../dto/qa.duedate.update.dto';
import RequestQaSimpleUpdateDto from '../dto/qa-simple.update.dto';
import RequestQaOrderUpdateDto from '../dto/qa-order.update.dto';

@ApiTags('QA')
@ApiResponse(createServerExceptionResponse())
@ApiResponse(createUnauthorizedResponse())
@Controller({ path: '/qa', version: '1' })
export default class QaController {
  constructor(
    private readonly qaService: QaService,
    private readonly qaCommentService: QaCommentService,
    private readonly userService: UserService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'QA 리스트 조회' })
  @ApiHeader({ name: 'workspace-code', required: true })
  @ApiResponse(QaResponse.findQaList[200])
  @WorkspaceRole(RoleEnum.VIEWER)
  @UseGuards(WorkspaceRoleGuard)
  @UseGuards(JwtAccessGuard)
  @Get('/')
  public async findQaList(
    @Query() findquery: RequestQaFindDto,
    @GetWorkspace() workspace: Workspace,
  ) {
    const { data, count } = await this.qaService.findQaList(
      workspace,
      findquery,
    );

    return CommonResponse.createResponse({
      statusCode: 200,
      message: 'Qa리스트를 조회합니다.',
      data: { data, count },
    });
  }

  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'QA 조회' })
  @ApiHeader({ name: 'workspace-code', required: true })
  @ApiResponse(QaResponse.findQa[200])
  @WorkspaceRole(RoleEnum.VIEWER)
  @UseGuards(WorkspaceRoleGuard)
  @UseGuards(JwtAccessGuard)
  @Get('/:id')
  public async findQaById(@Param('id') id: number) {
    const data = await this.qaService.findQaWithFileAndWorkerAndAdmin(id);

    return CommonResponse.createResponse({
      statusCode: 200,
      message: 'Qa를 조회합니다.',
      data: data,
    });
  }

  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'QA 생성' })
  @ApiHeader({ name: 'workspace-code', required: true })
  @ApiBody({ type: RequestSimpleQaSaveDto })
  @ApiResponse(QaResponse.saveQa[200])
  @WorkspaceRole(RoleEnum.WRITER)
  @UseGuards(WorkspaceRoleGuard)
  @UseGuards(JwtAccessGuard)
  @Post('/simple')
  public async saveSimpleQa(
    @Body() dto: RequestSimpleQaSaveDto,
    @GetWorkspace() workspace: Workspace,
    @GetUser() user: User,
  ) {
    const { id } = await this.qaService.saveQa(dto, user, workspace);

    this.sendQaQueue({
      qaId: id,
      email: user.email,
      type: QaHistoryTypeEnum.CREATE,
      log: 'QA를 생성했습니다.',
    });

    return CommonResponse.createResponseMessage({
      statusCode: 200,
      message: 'Qa를 생성합니다.',
    });
  }

  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'QA 수정' })
  @ApiHeader({ name: 'workspace-code', required: true })
  @ApiBody({ type: RequestQaUpdateDto })
  @ApiResponse(QaResponse.updateQa[200])
  @ApiResponse(QaResponse.updateQa[404])
  @WorkspaceRole(RoleEnum.WRITER)
  @UseGuards(WorkspaceRoleGuard)
  @UseGuards(JwtAccessGuard)
  @Put('/')
  public async updateQa(
    @Body() dto: RequestQaUpdateDto,
    @GetWorkspace() workspace: Workspace,
  ) {
    await this.qaService.updateQa(dto, workspace);

    return CommonResponse.createResponseMessage({
      statusCode: 200,
      message: 'Qa를 수정합니다.',
    });
  }

  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'QA 수정' })
  @ApiHeader({ name: 'workspace-code', required: true })
  @ApiBody({ type: RequestQaSimpleUpdateDto })
  @ApiResponse(QaResponse.updateQa[200])
  @ApiResponse(QaResponse.updateQa[404])
  @WorkspaceRole(RoleEnum.WRITER)
  @UseGuards(WorkspaceRoleGuard)
  @UseGuards(JwtAccessGuard)
  @Patch('/')
  public async updateSimpleQa(
    @Body() dto: RequestQaSimpleUpdateDto,
    @GetUser() { email }: User,
  ) {
    const qa = await this.qaService.findQaById(dto.qaId);
    await this.qaService.updateQaSimple(qa, dto);

    this.sendQaQueue({
      qaId: qa.id,
      email: email,
      type: dto.changeQaHistoryTypeEnum(),
      log: dto.changeLog(qa),
    });

    return CommonResponse.createResponseMessage({
      statusCode: 200,
      message: 'Qa를 수정합니다.',
    });
  }

  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'QA 정렬 순서 수정' })
  @ApiHeader({ name: 'workspace-code', required: true })
  @ApiBody({ type: RequestQaOrderUpdateDto })
  @ApiResponse(QaResponse.updateQa[200])
  @ApiResponse(QaResponse.updateQa[404])
  @WorkspaceRole(RoleEnum.WRITER)
  @UseGuards(WorkspaceRoleGuard)
  @UseGuards(JwtAccessGuard)
  @Patch('/order')
  public async updateQaOrder(
    @Body() dto: RequestQaOrderUpdateDto,
    @GetWorkspace() { id }: Workspace,
  ) {
    const qa = await this.qaService.findQaById(dto.qaId);
    const targetQa = await this.qaService.findQaById(dto.targetQaId);

    await this.qaService.updateQaOrder(qa, targetQa.orderId, id);

    return CommonResponse.createResponseMessage({
      statusCode: 200,
      message: 'Qa를 수정합니다.',
    });
  }

  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'QA 상태 수정' })
  @ApiHeader({ name: 'workspace-code', required: true })
  @ApiBody({ type: RequestQaStatusUpdateDto })
  @ApiResponse(QaResponse.updateStatusQa[200])
  @ApiResponse(QaResponse.updateStatusQa[404])
  @WorkspaceRole(RoleEnum.WRITER)
  @UseGuards(WorkspaceRoleGuard)
  @UseGuards(JwtAccessGuard)
  @Put('/status')
  public async updateStatusQa(
    @Body() dto: RequestQaStatusUpdateDto,
    @GetWorkspace() workspace: Workspace,
    @GetUser() { email }: User,
  ) {
    const qa = await this.qaService.findQa(dto.qaId, workspace.id);

    await this.qaService.updateQaStatus(qa, dto);

    this.sendQaQueue({
      qaId: qa.id,
      email: email,
      type: QaHistoryTypeEnum.STATUS,
      log: `${qa.status} -> ${dto.status}`,
    });

    return CommonResponse.createResponseMessage({
      statusCode: 200,
      message: 'Qa상태를 수정합니다.',
    });
  }

  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'QA dueDate 수정' })
  @ApiHeader({ name: 'workspace-code', required: true })
  @ApiBody({ type: RequestQaDueDateUpdateDto })
  @ApiResponse(QaResponse.updateStatusQa[200])
  @ApiResponse(QaResponse.updateStatusQa[404])
  @WorkspaceRole(RoleEnum.WRITER)
  @UseGuards(WorkspaceRoleGuard)
  @UseGuards(JwtAccessGuard)
  @Put('/dueDate')
  public async updatedueDateQa(
    @Body() dto: RequestQaDueDateUpdateDto,
    @GetWorkspace() workspace: Workspace,
    @GetUser() { email }: User,
  ) {
    const qa = await this.qaService.findQa(dto.qaId, workspace.id);

    await this.qaService.updateQaDueDate(qa, dto);

    this.sendQaQueue({
      qaId: qa.id,
      email: email,
      type: QaHistoryTypeEnum.DUE_DATE,
      log: `${qa.dueDate} -> ${dto.dueDate}`,
    });

    return CommonResponse.createResponseMessage({
      statusCode: 200,
      message: 'qa dueDate를 수정합니다.',
    });
  }

  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'QA 유저 수정' })
  @ApiHeader({ name: 'workspace-code', required: true })
  @ApiBody({ type: RequestQaUserUpdateDto })
  @ApiResponse(QaResponse.updateUserQa[200])
  @ApiResponse(QaResponse.updateUserQa[404.1])
  @ApiResponse(QaResponse.updateUserQa[404.2])
  @WorkspaceRole(RoleEnum.WRITER)
  @UseGuards(WorkspaceRoleGuard)
  @UseGuards(JwtAccessGuard)
  @Put('/user')
  public async updateUserQa(
    @Body() dto: RequestQaUserUpdateDto,
    @GetUser() { nickname, email }: User,
  ) {
    const qa = await this.qaService.findQaByIdWithWorkerAndAdmin(dto.qaId);
    const user = await this.userService.findUserById(dto.userId);
    await this.qaService.updateUserQa(dto, user);

    this.sendQaQueue({
      qaId: qa.id,
      email: email,
      type:
        dto.type === 'admin'
          ? QaHistoryTypeEnum.ADMIN
          : QaHistoryTypeEnum.WORKER,
      log: `${
        dto.type === 'admin' ? qa.admin.nickname : qa.worker.nickname
      } -> ${user.nickname}`,
    });

    this.eventEmitter.emit('qa.notification', {
      fcmToken: user.fcmToken,
      email: user.email,
      title: 'QA 담당자 변경',
      body: `${nickname}님이 QA 담당자로 지정하였습니다.`,
      status: NotificationStatusEnum.UNREAD,
      type: NotificationTypeEnum.QA,
      subId: dto.qaId,
    });

    return CommonResponse.createResponseMessage({
      statusCode: 200,
      message: 'Qa 담당자를 수정합니다.',
    });
  }

  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'QA 삭제' })
  @ApiHeader({ name: 'workspace-code', required: true })
  @ApiResponse(QaResponse.deleteQa[200])
  @ApiResponse(QaResponse.deleteQa[404])
  @WorkspaceRole(RoleEnum.WRITER)
  @UseGuards(WorkspaceRoleGuard)
  @UseGuards(JwtAccessGuard)
  @Delete('/:id')
  public async deleteQa(
    @Param('id') qaid: number,
    @GetWorkspace() workspace: Workspace,
  ) {
    await this.qaService.deleteQa(qaid, workspace);
    return CommonResponse.createResponseMessage({
      statusCode: 200,
      message: 'Qa를 삭제합니다.',
    });
  }

  /**
   * Send Ticket Queue
   * @param event
   */
  private sendQaQueue(event: RequestQaHistoryLogSaveDto) {
    this.eventEmitter.emit('qa.send-change-history', event);
  }
}
