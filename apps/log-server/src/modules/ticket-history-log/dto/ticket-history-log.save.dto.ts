import TicketHistoryTypeEnum from '../domain/ticket-history-log-type.enum';

export default class RequestTicketHistoryLogSaveDto {
  ticketId: number;
  username: string;
  subUsername?: string;
  type: TicketHistoryTypeEnum;
  after?: string;
  before?: string;
  log?: string;
}
