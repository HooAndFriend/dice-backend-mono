// ** Nest Imports
import { Injectable } from '@nestjs/common';

// ** Custom Module Imports
import QaHistoryLogRepository from '../repository/qa-history-log.repository';

// ** Dto Imports
import { RequestQaHistoryLogSaveDto } from '@hi-dice/common';

@Injectable()
export default class QaHistoryLogService {
  constructor(
    private readonly qaHistoryLogRepository: QaHistoryLogRepository,
  ) {}

  /**
   * Save Qa History Log
   * @param dto
   */
  public async saveQaHistoryLog(dto: RequestQaHistoryLogSaveDto) {
    await this.qaHistoryLogRepository.save(
      this.qaHistoryLogRepository.create({
        ...dto,
      }),
    );
  }

  /**
   * Find Qa History List
   * @param qaId
   * @returns
   */
  public async findQaHistoryList(qaId: number) {
    return await this.qaHistoryLogRepository.findAndCount({
      where: {
        qaId,
      },
      order: { createdDate: 'DESC' },
    });
  }
}
