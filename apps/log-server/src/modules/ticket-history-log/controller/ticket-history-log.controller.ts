// ** Nest Imports
import { Controller } from '@nestjs/common';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';

// ** Module Imports
import TicketHistoryLogService from '../service/ticket-history-log.service';

// ** Swagger Imports
import { ApiResponse, ApiTags } from '@nestjs/swagger';

// ** Response Imports
import {
  createServerExceptionResponse,
  createUnauthorizedResponse,
} from '@/src/global/response/common';

// ** Dto Imports
import RequestTicketHistoryLogSaveDto from '../dto/ticket-history-log.save.dto';

@ApiTags('Qa History Log')
@ApiResponse(createServerExceptionResponse())
@ApiResponse(createUnauthorizedResponse())
@Controller({ path: '/ticket-history-log', version: '1' })
export default class TicketHistoryLogController {
  constructor(
    private readonly ticketHistoryLogService: TicketHistoryLogService,
  ) {}

  @MessagePattern('ticket-history-log')
  async handleMessage(
    @Payload() data: RequestTicketHistoryLogSaveDto,
    @Ctx() context: RmqContext,
  ): Promise<void> {
    await this.ticketHistoryLogService.saveTicketHistoryLog(data);
  }
}
