// ** Nest Imports
import {
  Body,
  Controller,
  Delete,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';

// ** Module Imports
import TicketService from '../../ticket/service/ticket.service';

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
import TicketFileService from '../service/ticket.file.service';
import RequestTicketFileSaveDto from '../dto/file.save.dto';

@ApiTags('Ticket File')
@ApiResponse(createServerExceptionResponse())
@ApiResponse(createUnauthorizedResponse())
@Controller({ path: '/ticket/file', version: '1' })
export default class TicketFileController {
  constructor(
    private readonly ticketService: TicketService,
    private readonly ticketFileService: TicketFileService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  @ApiBearerAuth('access-token')
  @ApiHeader({ name: 'workspace-code', required: true })
  @ApiOperation({ summary: 'Ticket File 생성' })
  @ApiBody({ type: RequestTicketFileSaveDto })
  @ApiResponse(TicketResponse.saveTicketFile[200])
  @ApiResponse(TicketResponse.saveTicketFile[404])
  @WorkspaceRole(RoleEnum.WRITER)
  @UseGuards(WorkspaceRoleGuard)
  @UseGuards(JwtAccessGuard)
  @Post('/')
  public async saveTicketFile(
    @Body() dto: RequestTicketFileSaveDto,
    @GetUser() user: User,
  ) {
    const ticket = await this.ticketService.findTicketById(dto.ticketId);
    await this.ticketFileService.saveTicketFile(ticket, dto.file);

    this.sendTicketQueue({
      ticketId: ticket.ticketId,
      email: user.email,
      type: TicketHistoryTypeEnum.UPLOAD_FILE,
      log: dto.file,
    });

    return CommonResponse.createResponseMessage({
      statusCode: 200,
      message: 'Save Ticket File',
    });
  }

  @ApiBearerAuth('access-token')
  @ApiHeader({ name: 'workspace-code', required: true })
  @ApiOperation({ summary: 'Ticket File 삭제' })
  @ApiResponse(TicketResponse.deleteTicketFile[200])
  @ApiResponse(TicketResponse.deleteTicketFile[404])
  @WorkspaceRole(RoleEnum.WRITER)
  @UseGuards(WorkspaceRoleGuard)
  @UseGuards(JwtAccessGuard)
  @Delete('/:fileId')
  public async deleteTicketFile(
    @Param('fileId', ParseIntPipe) fileId: number,
    @GetUser() user: User,
  ) {
    const ticketFile = await this.ticketFileService.findTicketFile(fileId);
    await this.ticketFileService.deleteTicketFile(fileId);

    this.sendTicketQueue({
      ticketId: ticketFile.ticket.ticketId,
      email: user.email,
      type: TicketHistoryTypeEnum.UPLOAD_FILE,
      log: ticketFile.url,
    });

    return CommonResponse.createResponseMessage({
      statusCode: 200,
      message: 'Delete Ticket File',
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
