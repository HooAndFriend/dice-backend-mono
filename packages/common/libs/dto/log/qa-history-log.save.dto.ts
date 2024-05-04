import QaHistoryTypeEnum from '../../enum/log/qa-history-log-type.enum';

export default class RequestQaHistoryLogSaveDto {
  qaId: number;
  email: string;
  type: QaHistoryTypeEnum;
  log: string;
}
