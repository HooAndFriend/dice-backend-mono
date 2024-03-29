import { Injectable } from '@nestjs/common';
import QaHistoryLogRepository from '../repository/qa-history-log.repository';

@Injectable()
export default class QaHistoryLogService {
  constructor(
    private readonly qaHistoryLogRepository: QaHistoryLogRepository,
  ) {}
}
