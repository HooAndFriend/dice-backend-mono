// ** Nest Imports
import { Controller, UseGuards } from '@nestjs/common';

// ** Module Imports
import TicketLabelService from '../service/ticket.label.service';

// ** Swagger Imports
import {
  ApiBearerAuth,
  ApiHeader,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

// ** Response Imports
import {
  createServerExceptionResponse,
  createUnauthorizedResponse,
} from '@/src/global/response/common';

// ** Utils Imports
import JwtAccessGuard from '@/src/modules/auth/passport/auth.jwt-access.guard';

// ** Dto Imports

@ApiTags('Ticket Label')
@ApiBearerAuth('access-token')
@ApiHeader({ name: 'workspace-code', required: true })
@ApiResponse(createServerExceptionResponse())
@ApiResponse(createUnauthorizedResponse())
@UseGuards(JwtAccessGuard)
@Controller({ path: '/ticket/label', version: '1' })
export default class TicketLabelController {
  constructor(private readonly ticketLabelService: TicketLabelService) {}
}
