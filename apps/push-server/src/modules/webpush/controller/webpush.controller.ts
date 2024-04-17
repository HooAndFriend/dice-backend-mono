// ** Nest Imports
import { Controller, Get, Query } from '@nestjs/common';

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
import CommonResponse from '@/src/global/dto/api.response';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import SendPushDto from '../dto/push.send';
import SendMultiPushDto from '../dto/push-multi.send';

@ApiTags('Web Push')
@ApiResponse(createServerExceptionResponse())
@ApiResponse(createUnauthorizedResponse())
@Controller({ path: '/web-push', version: '1' })
export default class WebPushController {
  constructor(private readonly webPushService: WebPushService) {}

  @Get()
  public async sendPush(@Query('token') token: string) {
    await this.webPushService.sendPushMessage(
      new SendPushDto(token, 'title', 'body'),
    );
    return CommonResponse.createResponseMessage({
      statusCode: 200,
      message: 'Success',
    });
  }

  @MessagePattern('send-single-push')
  async handleMessage(
    @Payload() data: SendPushDto,
    @Ctx() context: RmqContext,
  ): Promise<void> {
    await this.webPushService.sendPushMessage(data);
  }

  @MessagePattern('send-multi-push')
  async handleMultiMessage(
    @Payload() data: SendMultiPushDto,
    @Ctx() context: RmqContext,
  ): Promise<void> {
    await this.webPushService.sendPushMessageToMultiple(data);
  }
}
