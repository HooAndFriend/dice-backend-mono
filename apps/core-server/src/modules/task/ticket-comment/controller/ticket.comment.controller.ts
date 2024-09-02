// ** Nest Imports
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';

// ** Module Imports
import TicketCommentService from '../service/ticket.comment.service';

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
} from '../../../../global/response/common';
import { TicketResponse } from '@/src/global/response/ticket.response';

// ** Utils Imports
import JwtAccessGuard from '../../../auth/passport/auth.jwt-access.guard';
import { GetUser } from '../../../../global/decorators/user/user.decorators';
import { WorkspaceRoleGuard } from '@/src/global/decorators/workspace-role/workspace-role.guard';
import { WorkspaceRole } from '@/src/global/decorators/workspace-role/workspace-role.decorator';

// ** Dto Imports
import User from '../../../user/domain/user.entity';
import {
  CommonResponse,
  RequestTicketHistoryLogSaveDto,
  TicketHistoryTypeEnum,
} from '@hi-dice/common';
import { RoleEnum } from '@hi-dice/common';
import RequestTicketCommentSaveDto from '../dto/comment.save.dto';
import RequestTicketCommentUpdateDto from '../dto/comment.update.dto';

@ApiTags('Ticket Comment')
@ApiResponse(createServerExceptionResponse())
@ApiResponse(createUnauthorizedResponse())
@Controller({ path: '/ticket/comment', version: '1' })
export default class TicketCommentController {
  constructor(
    private readonly ticketCommentService: TicketCommentService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  @ApiBearerAuth('access-token')
  @ApiHeader({ name: 'workspace-code', required: true })
  @ApiOperation({ summary: 'COMMENT 조회' })
  @ApiResponse(TicketResponse.findComment[200])
  @ApiResponse(TicketResponse.findComment[404])
  @WorkspaceRole(RoleEnum.VIEWER)
  @UseGuards(WorkspaceRoleGuard)
  @UseGuards(JwtAccessGuard)
  @Get('/:ticketId')
  public async findComment(@Param('ticketId') id: number) {
    const [data, count] = await this.ticketCommentService.findComment(id);

    return CommonResponse.createResponse({
      statusCode: 200,
      message: 'Find Comment',
      data: { data, count },
    });
  }

  @ApiBearerAuth('access-token')
  @ApiHeader({ name: 'workspace-code', required: true })
  @ApiOperation({ summary: 'COMMENT 생성' })
  @ApiBody({ type: RequestTicketCommentSaveDto })
  @ApiResponse(TicketResponse.saveComment[200])
  @ApiResponse(TicketResponse.saveComment[404])
  @WorkspaceRole(RoleEnum.WRITER)
  @UseGuards(WorkspaceRoleGuard)
  @UseGuards(JwtAccessGuard)
  @Post('/')
  public async saveComment(
    @Body() dto: RequestTicketCommentSaveDto,
    @GetUser() user: User,
  ) {
    await this.ticketCommentService.saveComment(dto, user);

    this.sendTicketQueue({
      ticketId: dto.ticketId,
      creatorEmail: user.email,
      creatorProfile: user.profile,
      creatorNickname: user.nickname,
      type: TicketHistoryTypeEnum.ADD_COMMENT,
      beforeLog: '-',
      afterLog: dto.content,
    });

    return CommonResponse.createResponseMessage({
      statusCode: 200,
      message: 'Save Comment',
    });
  }

  @ApiBearerAuth('access-token')
  @ApiHeader({ name: 'workspace-code', required: true })
  @ApiOperation({ summary: 'COMMENT 수정' })
  @ApiBody({ type: RequestTicketCommentUpdateDto })
  @ApiResponse(TicketResponse.updateComment[200])
  @ApiResponse(TicketResponse.updateComment[404])
  @WorkspaceRole(RoleEnum.WRITER)
  @UseGuards(WorkspaceRoleGuard)
  @UseGuards(JwtAccessGuard)
  @Patch('/')
  public async updateComment(
    @Body() dto: RequestTicketCommentUpdateDto,
    @GetUser() user: User,
  ) {
    const comment = await this.ticketCommentService.findCommentDomainById(
      dto.commentId,
    );
    await this.ticketCommentService.updateComment(dto, user);

    this.sendTicketQueue({
      ticketId: comment.ticket.ticketId,
      creatorEmail: user.email,
      creatorProfile: user.profile,
      creatorNickname: user.nickname,
      type: TicketHistoryTypeEnum.UPDATE_COMMENT,
      beforeLog: comment.content,
      afterLog: dto.content,
    });

    return CommonResponse.createResponseMessage({
      statusCode: 200,
      message: 'Update Comment',
    });
  }

  @ApiBearerAuth('access-token')
  @ApiHeader({ name: 'workspace-code', required: true })
  @ApiOperation({ summary: 'COMMENT 삭제' })
  @ApiResponse(TicketResponse.deleteComment[200])
  @ApiResponse(TicketResponse.deleteComment[404])
  @WorkspaceRole(RoleEnum.WRITER)
  @UseGuards(WorkspaceRoleGuard)
  @UseGuards(JwtAccessGuard)
  @Delete('/:commentId')
  public async deleteComment(
    @Param('commentId', ParseIntPipe) id: number,
    @GetUser() user: User,
  ) {
    const comment = await this.ticketCommentService.findCommentDomainById(id);

    await this.ticketCommentService.deleteComment(id);

    this.sendTicketQueue({
      ticketId: comment.ticket.ticketId,
      creatorEmail: user.email,
      creatorProfile: user.profile,
      creatorNickname: user.nickname,
      type: TicketHistoryTypeEnum.DELETE_COMMENT,
      beforeLog: comment.content,
      afterLog: '-',
    });

    return CommonResponse.createResponseMessage({
      statusCode: 200,
      message: 'Delete Comment',
    });
  }

  /**
   * Send Ticket Queue
   * @param event
   */
  private sendTicketQueue(event: RequestTicketHistoryLogSaveDto) {
    this.eventEmitter.emit('ticket.send-change-history', event);
  }
}
