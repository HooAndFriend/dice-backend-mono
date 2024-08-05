// ** Nest Imports
import { Controller } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';

// ** Module Imports

// ** Swagger Imports
import { ApiResponse, ApiTags } from '@nestjs/swagger';

// ** Response Imports
import {
  createServerExceptionResponse,
  createUnauthorizedResponse,
} from '../../../../global/response/common';

// ** Utils Imports

// ** Dto Imports
import { RequestTicketHistoryLogSaveDto } from '@hi-dice/common';

@ApiTags('Ticket Link')
@ApiResponse(createServerExceptionResponse())
@ApiResponse(createUnauthorizedResponse())
@Controller({ path: '/ticket/link', version: '1' })
export default class TicketFileController {
  constructor(private readonly eventEmitter: EventEmitter2) {}

  /**
   * Send Ticket Queue
   * @param event
   */
  private sendTicketQueue(event: RequestTicketHistoryLogSaveDto) {
    this.eventEmitter.emit('ticket.send-change-history', event);
  }
}
