// ** Nest Imports
import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

// ** Custom Module Imports
import EpicRepository from '../repository/epic.repository';
import TicketRepository from '../repository/ticket.repository';
import TicketFileRepository from '../repository/ticket.file.repository';
import TicketCommentRepository from '../repository/ticket.comment.repository';

// ** Response Imports

// Other Imports

// ** enum, dto, entity, types Imports
import RequestTicketFindDto from '../dto/ticket.find.dto';

@Injectable()
export default class TicketService {
  constructor(
    private readonly configService: ConfigService,
    private readonly epicRepository: EpicRepository,
    private readonly ticketRepository: TicketRepository,
    private readonly ticketFileRepository: TicketFileRepository,
    private readonly ticketCommentRepository: TicketCommentRepository,
  ) {}

  public async findAllTicket() {
    const [ticket, count] = await this.ticketRepository.findAllTicket();
    
    return {ticket, count};
  }
  public async findTicketByQuery(findquery: RequestTicketFindDto) {
    const [ticket, count] = await this.ticketRepository.findTicketByQuery(findquery);
    
    return {ticket, count};
  }
}
