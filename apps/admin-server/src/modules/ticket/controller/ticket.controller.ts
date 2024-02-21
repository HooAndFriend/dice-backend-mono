// ** Nest Imports
import {
  Controller,
  Get,
  UseGuards,
} from '@nestjs/common';

// ** Module Imports
import TicketService from '../service/ticket.service';

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
} from '../../../global/response/common';

// ** Utils Imports
import JwtAccessGuard from '../../auth/passport/auth.jwt-access.guard';
import { TicketResponse } from '@/src/global/response/ticket.response';

@ApiTags('Workspace Ticket')
@ApiResponse(createServerExceptionResponse())
@ApiResponse(createUnauthorizedResponse())
@Controller({ path: '/ticket', version: '1' })
export default class TicketController {
  constructor(private readonly ticketService: TicketService) {}

  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'TICKET 전체 조회' })
  @ApiResponse(TicketResponse.findAllTicket[200])
  @UseGuards(JwtAccessGuard)
  @Get('/')
  public async findAllTicket() {
  }
}
