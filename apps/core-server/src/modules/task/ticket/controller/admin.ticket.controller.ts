// ** Nest Imports
import { Controller, Get, Query, UseGuards } from '@nestjs/common';

// ** Module Imports
import TicketService from '../service/ticket.service';

// ** Swagger Imports
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

// ** Utils Imports
import JwtAccessGuard from '@/src/modules/auth/passport/auth.jwt-access.guard';

// ** Response Imports
import {
  createServerExceptionResponse,
  createUnauthorizedResponse,
} from '@/src/global/response/common';
import { TicketResponse } from '@/src/global/response/ticket.response';
import { CommonResponse } from '@hi-dice/common';

// ** Dto Imports
import RequestTicketFindDto from '../dto/ticket/ticket.find.dto';

@ApiTags('Admin Ticket')
@ApiResponse(createServerExceptionResponse())
@ApiResponse(createUnauthorizedResponse())
@Controller({ path: '/admin/ticket', version: '1' })
export default class AdminTicketController {
  constructor(private readonly ticketService: TicketService) {}

  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'TICKET 리스트 관리자 조회' })
  @ApiResponse(TicketResponse.findAllTicketAdmin[200])
  @UseGuards(JwtAccessGuard)
  @Get('/')
  public async findDetailTicket(@Query() query: RequestTicketFindDto) {
    const ticket = await this.ticketService.findTicketByQuery(query);

    return CommonResponse.createResponse({
      statusCode: 200,
      message: 'Ticket을 전체 조회합니다.',
      data: ticket,
    });
  }
}
