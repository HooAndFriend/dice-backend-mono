import { Injectable } from '@nestjs/common';
import QaHistoryLogRepository from '../repository/qa-history-log.repository';
import RequestQaHistoryLogSaveDto from '../dto/qa-history-log.save.dto';

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
        qaId: dto.qaId,
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
