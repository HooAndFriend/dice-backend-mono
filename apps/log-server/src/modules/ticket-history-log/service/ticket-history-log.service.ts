import { Injectable } from '@nestjs/common';
import QaHistoryLogRepository from '../repository/ticket-history-log.repository';
import RequestQaHistoryLogSaveDto from '../dto/ticket-history-log.save.dto';
import TicketHistoryLogRepository from '../repository/ticket-history-log.repository';
import RequestTicketHistoryLogSaveDto from '../dto/ticket-history-log.save.dto';

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
        ticketId: dto.ticketId,
        username: dto.username,
        subUsername: dto.subUsername,
        type: dto.type,
        after: dto.after,
        before: dto.before,
        log: dto.log,
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
