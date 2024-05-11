// ** Nest Imports
import { Injectable } from '@nestjs/common';

// ** Custom Module Imports
import TicketHistoryLogRepository from '../repository/ticket-history-log.repository';

// ** Dto Imports
import { RequestTicketHistoryLogSaveDto } from '@hi-dice/common';
import InternalCoreSenderService from '../../internal/internal-core/service/internal-core.sender.service';

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
   * Find Ticket List
   * @param ticketId
   * @returns
   */
  public async findTicketHistoryList(ticketId: number) {
    const [data, count] = await this.ticketHistoryLogRepository.findAndCount({
      where: { ticketId },
      order: { createdDate: 'DESC' },
    });

    const userList = await this.findUserProfileList(
      data.map((item) => item.email),
    );

    return [
      data.map((item) => ({
        ...item,
        user: userList.find((_) => _.email === item.email) || null,
      })),
      count,
    ];
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
