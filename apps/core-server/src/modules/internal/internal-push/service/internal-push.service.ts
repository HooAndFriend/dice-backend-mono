// ** Nest Imports
import { SendPushDto } from '@hi-dice/common';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export default class InternalPushService {
  constructor(
    @Inject('RMQ_PUSH_QUE') private readonly rmqClient: ClientProxy,
  ) {}

  private logger = new Logger(InternalPushService.name);

  /**
   * 웹 푸시를 전송합니다.
   */
  public async sendWebPush(event: SendPushDto): Promise<void> {
    this.rmqClient
      .emit<SendPushDto>('send-push', event)
      .toPromise()
      .catch((err) => {
        this.logger.log(err);
      });
  }
}
