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
    private readonly ticketRepository: TicketRepository,
  ) {}
  public async findTicketByQuery(findquery: RequestTicketFindDto) {
    const [ticket, count] = await this.ticketRepository.findTicketByQuery(findquery);
    
    return {ticket, count};
  }
}
