// ** Nest Imports
import { Inject, Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { ClientProxy } from '@nestjs/microservices';

// ** Dto Imports
import RequestQaHistoryLogSaveDto from '../dto/qa-history-log.save.dto';

@Injectable()
export class QaSendChangeHistoryListener {
  constructor(@Inject('RMQ_LOG_QUE') private readonly rmqClient: ClientProxy) {}

  private logger = new Logger(QaSendChangeHistoryListener.name);

  @OnEvent('qa.send-change-history')
  handleQaChangeHistory(event: RequestQaHistoryLogSaveDto) {
    this.rmqClient
      .emit<RequestQaHistoryLogSaveDto>('qa-history-log', event)
      .toPromise()
      .catch((err) => {
        this.logger.log(err);
      });
  }
}
