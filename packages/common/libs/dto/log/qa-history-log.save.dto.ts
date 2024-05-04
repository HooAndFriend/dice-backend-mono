import { QaHistoryTypeEnum } from '../../enum/log/QaHistoryLogType.enum';

export class RequestQaHistoryLogSaveDto {
  qaId: number;
  email: string;
  type: QaHistoryTypeEnum;
  log: string;
}
