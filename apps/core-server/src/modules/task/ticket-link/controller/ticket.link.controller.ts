// ** Nest Imports
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';

// ** Module Imports

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
import { WorkspaceRole } from '@/src/global/decorators/workspace-role/workspace-role.decorator';
import { WorkspaceRoleGuard } from '@/src/global/decorators/workspace-role/workspace-role.guard';
import JwtAccessGuard from '@/src/modules/auth/passport/auth.jwt-access.guard';

// ** Dto Imports
import {
  CommonResponse,
  RequestTicketHistoryLogSaveDto,
  RoleEnum,
} from '@hi-dice/common';
import RequestTicketLinkSaveDto from '../dto/link.save.dto';
import TicketLinkService from '../service/ticket.link.service';

@ApiTags('Ticket Link')
@ApiResponse(createServerExceptionResponse())
@ApiResponse(createUnauthorizedResponse())
@Controller({ path: '/ticket/link', version: '1' })
export default class TicketLinkController {
  constructor(
    private readonly eventEmitter: EventEmitter2,
    private readonly ticketLinkService: TicketLinkService,
  ) {}

  @ApiBearerAuth('access-token')
  @ApiHeader({ name: 'workspace-code', required: true })
  @ApiOperation({ summary: 'TICKET 링크 추가' })
  @ApiBody({ type: RequestTicketLinkSaveDto })
  @ApiResponse(TicketResponse.saveTicketLink[200])
  @ApiResponse(TicketResponse.saveTicketLink[400])
  @ApiResponse(TicketResponse.saveTicketLink[404])
  @WorkspaceRole(RoleEnum.WRITER)
  @UseGuards(WorkspaceRoleGuard)
  @UseGuards(JwtAccessGuard)
  @Post()
  public async saveTicketLink(@Body() dto: RequestTicketLinkSaveDto) {
    await this.ticketLinkService.saveTicketLink(dto);

    return CommonResponse.createResponseMessage({
      statusCode: 200,
      message: 'Save Ticket Link',
    });
  }

  //티켓 링크 삭제
  @ApiBearerAuth('access-token')
  @ApiHeader({ name: 'workspace-code', required: true })
  @ApiOperation({ summary: 'TICKET 링크 삭제' })
  @ApiResponse(TicketResponse.deleteTicketLink[200])
  @ApiResponse(TicketResponse.deleteTicketLink[404])
  @WorkspaceRole(RoleEnum.WRITER)
  @UseGuards(WorkspaceRoleGuard)
  @UseGuards(JwtAccessGuard)
  @Delete(':linkId')
  public async deleteTicketLink(@Param('linkId') linkId: number) {
    await this.ticketLinkService.deleteTicketLink(linkId);

    return CommonResponse.createResponseMessage({
      statusCode: 200,
      message: 'Delete Ticket Link',
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
