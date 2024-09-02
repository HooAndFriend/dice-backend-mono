// ** Nest Imports
import { Injectable } from '@nestjs/common';

// ** Custom Module Imports
import TicketHistoryLogRepository from '../repository/ticket-history-log.repository';
import InternalCoreSenderService from '../../internal/internal-core/service/internal-core.sender.service';

// ** Dto Imports
import { RequestTicketHistoryLogSaveDto } from '@hi-dice/common';
import TicketHistoryLog from '../domain/ticket-history-log.entity';

@Injectable()
export default class TicketHistoryLogService {
  constructor(
    private readonly ticketHistoryLogRepository: TicketHistoryLogRepository,
    private readonly internalCoreSenderService: InternalCoreSenderService,
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
   * 티켓 히스토리 조회
   */
  public async findTicketHistoryList(
    ticketId: number,
  ): Promise<[TicketHistoryLog[], number]> {
    return await this.ticketHistoryLogRepository.findAndCount({
      where: { ticketId },
      order: { createdDate: 'DESC' },
    });
  }

  /**
   * find User Profile List
   * @param emailList
   * @returns
   */
  private async findUserProfileList(emailList: string[]) {
    const { data } = await this.internalCoreSenderService.findUserProfileList(
      emailList,
    );

    return data;
  }
}
