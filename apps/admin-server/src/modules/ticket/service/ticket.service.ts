// ** Nest Imports
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

// ** Custom Module Imports
import EpicRepository from '../repository/epic.repository';
import TicketRepository from '../repository/ticket.repository';
import TicketFileRepository from '../repository/ticket.file.repository';
import TicketCommentRepository from '../repository/ticket.comment.repository';

// ** Response Imports

// Other Imports

// ** enum, dto, entity, types Imports

@Injectable()
export default class TicketService {
  constructor(
    private readonly configService: ConfigService,
    private readonly epicRepository: EpicRepository,
    private readonly ticketRepository: TicketRepository,
    private readonly ticketFileRepository: TicketFileRepository,
    private readonly ticketCommentRepository: TicketCommentRepository,
  ) {}
}
