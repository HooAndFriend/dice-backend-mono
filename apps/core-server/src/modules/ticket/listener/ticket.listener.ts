// ** Nest Imports
import { Inject, Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { ClientProxy } from '@nestjs/microservices';

import RequestTicketHistoryLogSaveDto from '../dto/ticket/ticket-history-log.save.dto';

@Injectable()
export class TicketSendChangeHistoryListener {
  constructor(@Inject('RMQ_LOG_QUE') private readonly rmqClient: ClientProxy) {}

  private logger = new Logger(TicketSendChangeHistoryListener.name);

  @OnEvent('ticket.send-change-history')
  handleTicketChangeHistory(event: RequestTicketHistoryLogSaveDto) {
    this.rmqClient
      .emit<RequestTicketHistoryLogSaveDto>('ticket-history-log', event)
      .toPromise()
      .catch((err) => {
        this.logger.log(err);
      });
  }
}
