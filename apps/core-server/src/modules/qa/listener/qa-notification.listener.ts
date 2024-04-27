// ** Nest Imports
import { Inject, Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { ClientProxy } from '@nestjs/microservices';

// ** Dto Imports
import { SendPushDto } from '@repo/common';

@Injectable()
export class QaNotificationListener {
  constructor(
    @Inject('RMQ_PUSH_QUE') private readonly rmqClient: ClientProxy,
  ) {}

  private logger = new Logger(QaNotificationListener.name);

  @OnEvent('qa.notification')
  handleQaChangeHistory(event: SendPushDto) {
    console.log('LOG SEND');
    this.rmqClient
      .emit<SendPushDto>('send-single-push', event)
      .toPromise()
      .catch((err) => {
        this.logger.log(err);
      });
  }
}
