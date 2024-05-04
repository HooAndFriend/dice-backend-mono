import { TicketHistoryTypeEnum } from '../../enum/log/TicketHistoryLogType.enum';

export class RequestTicketHistoryLogSaveDto {
  ticketId: number;
  email: string;
  type: TicketHistoryTypeEnum;
  log?: string;
}
