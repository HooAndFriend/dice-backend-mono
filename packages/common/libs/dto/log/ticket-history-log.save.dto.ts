import TicketHistoryTypeEnum from '../../enum/log/ticket-history-log-type.enum';

export default class RequestTicketHistoryLogSaveDto {
  ticketId: number;
  email: string;
  type: TicketHistoryTypeEnum;
  log?: string;
}
