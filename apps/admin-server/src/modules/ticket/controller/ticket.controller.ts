// ** Nest Imports
import { Controller, Get, Query, UseGuards } from '@nestjs/common';

// ** Module Imports
import TicketService from '../service/ticket.service';

// ** Swagger Imports
import {
  ApiBearerAuth,
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

// ** Utils Imports
import JwtAccessGuard from '../../auth/passport/auth.jwt-access.guard';
import { TicketResponse } from '@/src/global/response/ticket.response';
import CommonResponse from '@/src/global/dto/api.response';
import RequestTicketFindDto from '../dto/ticket.find.dto';

@ApiTags('Workspace Ticket')
@ApiResponse(createServerExceptionResponse())
@ApiResponse(createUnauthorizedResponse())
@Controller({ path: '/ticket', version: '1' })
export default class TicketController {
  constructor(private readonly ticketService: TicketService) {}

  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'TICKET 리스트 조회' })
  @ApiResponse(TicketResponse.findAllTicket[200])
  @UseGuards(JwtAccessGuard)
  @Get('/')
  public async findDetailTicket(@Query() findquery: RequestTicketFindDto) {
    const ticket = await this.ticketService.findTicketByQuery(findquery);

    return CommonResponse.createResponse({
      statusCode: 200,
      message: 'Ticket을 전체 조회합니다.',
      data: ticket,
    });
  }
}
