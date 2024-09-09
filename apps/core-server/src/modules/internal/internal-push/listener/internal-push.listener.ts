// ** Nest Imports
import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

// ** Custom Module Imports
import InternalPushService from '../service/internal-push.service';

// ** dto Imports
import { SendPushDto } from '@hi-dice/common';

@Injectable()
export class InternalPushListener {
  constructor(private readonly internalPushService: InternalPushService) {}

  private logger = new Logger(InternalPushListener.name);

  @OnEvent('push.send-web-push')
  public async handleWebPush(event: SendPushDto) {
    await this.internalPushService.sendWebPush(event);
  }
}
