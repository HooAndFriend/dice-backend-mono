import QaHistoryTypeEnum from '../domain/qa-history-log-type.enum';

export default class RequestQaHistoryLogSaveDto {
  qaId: number;
  username: string;
  subUsername?: string;
  type: QaHistoryTypeEnum;
  after?: string;
  before?: string;
  log?: string;
}
