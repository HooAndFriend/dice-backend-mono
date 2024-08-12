// ** Nest Imports
import { Injectable, Logger } from '@nestjs/common';

// ** Custom Module Imports
import TicketFileRepository from '../repository/ticket.file.repository';

// ** enum, dto, entity, types Imports
import { NotFoundException } from '@/src/global/exception/CustomException';
import Ticket from '../../ticket/domain/ticket.entity';
import TicketFile from '../domain/ticket.file.entity';

@Injectable()
export default class TicketFileService {
  constructor(private readonly ticketFileRepository: TicketFileRepository) {}

  private logger = new Logger(TicketFileService.name);

  /**
   * 티켓의 파일 저장
   */
  public async saveTicketFile(ticket: Ticket, file: string): Promise<void> {
    await this.ticketFileRepository.save(
      this.ticketFileRepository.create({
        url: file,
        ticket,
      }),
    );
  }

  /**
   * 티켓의 파일 삭제
   */
  public async deleteTicketFile(ticketFileId: number): Promise<void> {
    await this.ticketFileRepository.delete(ticketFileId);
  }

  /**
   * 티켓의 파일 있는 지 검증
   */
  public async isExistedTicketFile(ticketFileId: number): Promise<void> {
    const ticketFile = await this.ticketFileRepository.exist({
      where: { ticketFileId },
    });

    if (!ticketFile) {
      throw new NotFoundException('Not Found Ticket File');
    }
  }

  /**
   * 티켓 파일 조회
   */
  public async findTicketFile(ticketFileId: number): Promise<TicketFile> {
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
