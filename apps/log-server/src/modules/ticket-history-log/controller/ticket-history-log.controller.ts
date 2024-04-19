// ** Nest Imports
import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';

// ** Module Imports
import TicketHistoryLogService from '../service/ticket-history-log.service';

// ** Swagger Imports
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

// ** Response Imports
import {
  createServerExceptionResponse,
  createUnauthorizedResponse,
} from '@/src/global/response/common';
import CommonResponse from '@/src/global/dto/api.response';
import { TicketHistoryLogResponse } from '@/src/global/response/ticket-history-log.response';

// ** Utils Imports
import JwtAccessGuard from '@/src/global/guard/auth.jwt-access.guard';

// ** Dto Imports
import RequestTicketHistoryLogSaveDto from '../dto/ticket-history-log.save.dto';

@ApiTags('Ticket History Log')
@ApiResponse(createServerExceptionResponse())
@ApiResponse(createUnauthorizedResponse())
@Controller({ path: '/ticket-history-log', version: '1' })
export default class TicketHistoryLogController {
  constructor(
    private readonly ticketHistoryLogService: TicketHistoryLogService,
  ) {}

  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Ticket의 히스토리 리스트 조회' })
  @ApiResponse(TicketHistoryLogResponse.findTicketHistoryList[200])
  @UseGuards(JwtAccessGuard)
  @Get('/:id')
  public async findTicketHistoryList(@Param('id') id: number) {
    const [data, count] =
      await this.ticketHistoryLogService.findTicketHistoryList(id);

    return CommonResponse.createResponse({
      data: { data, count },
      statusCode: 200,
      message: 'Find Ticket History List',
    });
  }

  @MessagePattern('ticket-history-log')
  async handleMessage(
    @Payload() data: RequestTicketHistoryLogSaveDto,
    @Ctx() context: RmqContext,
  ): Promise<void> {
    await this.ticketHistoryLogService.saveTicketHistoryLog(data);
  }
}
