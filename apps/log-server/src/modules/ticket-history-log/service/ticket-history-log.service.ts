// ** Nest Imports
import { Injectable } from '@nestjs/common';

// ** Custom Module Imports
import TicketHistoryLogRepository from '../repository/ticket-history-log.repository';

// ** Dto Imports
import { RequestTicketHistoryLogSaveDto } from '@hi-dice/common';

@Injectable()
export default class TicketHistoryLogService {
  constructor(
    private readonly ticketHistoryLogRepository: TicketHistoryLogRepository,
  ) {}

  /**
   * Save Qa History Log
   * @param dto
   */
  public async saveTicketHistoryLog(dto: RequestTicketHistoryLogSaveDto) {
    await this.ticketHistoryLogRepository.save(
      this.ticketHistoryLogRepository.create({
        ...dto,
      }),
    );
  }

  /**
   * Find Ticket List
   * @param ticketId
   * @returns
   */
  public async findTicketHistoryList(ticketId: number) {
    return await this.ticketHistoryLogRepository.findAndCount({
      where: { ticketId },
      order: { createdDate: 'DESC' },
    });
  }
}
