// ** Nest Imports
import { Injectable, Logger } from '@nestjs/common';

// ** Custom Module Imports

import TicketFileRepository from '../repository/ticket.file.repository';
import Ticket from '../domain/ticket.entity';

// ** enum, dto, entity, types Imports

@Injectable()
export default class TicketFileService {
  constructor(private readonly ticketFileRepository: TicketFileRepository) {}

  private logger = new Logger(TicketFileService.name);

  /**
   * Save Ticket File
   * @param ticket
   * @param file
   */
  public async saveTicketFile(ticket: Ticket, file: string) {
    await this.ticketFileRepository.save(
      this.ticketFileRepository.create({
        url: file,
        ticket,
      }),
    );
  }
}
