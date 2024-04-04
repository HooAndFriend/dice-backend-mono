// ** Nest Imports
import { Injectable, Logger } from '@nestjs/common';

// ** Custom Module Imports

import TicketFileRepository from '../repository/ticket.file.repository';
import Ticket from '../domain/ticket.entity';
import { NotFoundException } from '@/src/global/exception/CustomException';

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

  /**
   * Delete Ticket File
   * @param ticketFileId
   */
  public async deleteTicketFile(ticketFileId: number) {
    await this.ticketFileRepository.delete(ticketFileId);
  }

  /**
   * Exist Ticket File
   * @param ticketFileId
   */
  public async isExistedTicketFile(ticketFileId: number) {
    const ticketFile = await this.ticketFileRepository.exist({
      where: { id: ticketFileId },
    });

    if (!ticketFile) {
      throw new NotFoundException('Not Found Ticket File');
    }
  }
}
