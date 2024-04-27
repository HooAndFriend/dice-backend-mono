// ** Nest Imports
import { Controller, Logger } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';

// ** Module Imports
import WebPushService from '../service/webpush.service';

// ** Swagger Imports
import { ApiResponse, ApiTags } from '@nestjs/swagger';

// ** Response Imports
import {
  createServerExceptionResponse,
  createUnauthorizedResponse,
} from '@/src/global/response/common';

// ** Dto Imports
import SendPushDto from '../dto/push.send';
import SendMultiPushDto from '../dto/push-multi.send';
import SaveNotificatioNDto from '../../notification/dto/notification.save.dto';
import SaveMultiNotificatioNDto from '../../notification/dto/notification-multi.save.dto';

@ApiTags('Web Push')
@ApiResponse(createServerExceptionResponse())
@ApiResponse(createUnauthorizedResponse())
@Controller({ path: '/web-push', version: '1' })
export default class WebPushController {
  private readonly logger = new Logger(WebPushController.name);
  constructor(
    private readonly webPushService: WebPushService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  @MessagePattern('send-single-push')
  async handleMessage(
    @Payload() data: SendPushDto,
    @Ctx() context: RmqContext,
  ): Promise<void> {
    this.logger.log(
      `Single Push ${data.email}[${data.fcmToken}] : ${data.title}[${data.type}] - ${data.body}`,
    );
    // await this.webPushService.sendPushMessage(
    //   data.title,
    //   data.body,
    //   data.fcmToken,
    // );

    this.eventEmitter.emit(
      'notification.save-notification',
      new SaveNotificatioNDto(
        data.email,
        data.title,
        data.body,
        data.status,
        data.type,
        data.subId,
      ),
    );
  }

  @MessagePattern('send-multi-push')
  async handleMultiMessage(
    @Payload() data: SendMultiPushDto,
    @Ctx() context: RmqContext,
  ): Promise<void> {
    this.logger.log(
      `Multi Push ${JSON.stringify(data.email)}[${JSON.stringify(
        data.fcmToken,
      )}] : ${data.title}[${data.type}] - ${data.body}`,
    );
    // await this.webPushService.sendPushMessageToMultiple(
    //   data.title,
    //   data.body,
    //   data.fcmToken,
    // );
    this.eventEmitter.emit(
      'notification.save-notification',
      new SaveMultiNotificatioNDto(
        data.email,
        data.title,
        data.body,
        data.status,
        data.type,
        data.subId,
      ),
    );
  }
}
