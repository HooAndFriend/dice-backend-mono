// ** Nest Imports
import { Injectable, Logger } from '@nestjs/common';

// ** Custom Module Imports
import TicketFileRepository from '../repository/ticket.file.repository';

// ** enum, dto, entity, types Imports
import { NotFoundException } from '@hi-dice/common';
import Ticket from '../../ticket/domain/ticket.entity';

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
      where: { ticketFileId },
    });

    if (!ticketFile) {
      throw new NotFoundException('Not Found Ticket File');
    }
  }

  /**
   * Find Ticket File
   * @param ticketFileId
   * @returns
   */
  public async findTicketFile(ticketFileId: number) {
    const ticketFile = await this.ticketFileRepository.findOne({
      where: { ticketFileId },
      relations: ['ticket'],
    });

    if (!ticketFile) {
      throw new NotFoundException('Not Found Ticket File');
    }

    return ticketFile;
  }
}
