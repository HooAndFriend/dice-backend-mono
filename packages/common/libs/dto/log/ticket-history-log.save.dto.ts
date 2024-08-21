import { TicketHistoryTypeEnum } from '../../enum/log/TicketHistoryLogType.enum';

export class RequestTicketHistoryLogSaveDto {
  ticketId?: number;
  creatorEmail?: string;
  creatorNickname?: string;
  creatorProfile?: string;
  type?: TicketHistoryTypeEnum;
  beforeLog?: string;
  beforeEmail?: string;
  beforeNickname?: string;
  beforeProfile?: string;
  afterLog?: string;
  afterEmail?: string;
  afterNickname?: string;
  afterProfile?: string;
}
