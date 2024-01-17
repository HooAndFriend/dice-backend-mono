import {
  ClientProxy,
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { Controller } from '@nestjs/common';

@Controller()
export class AppController {
  constructor() {}

  @MessagePattern({ cmd: 'send-message' })
  async handleMessage(data: string): Promise<string> {
    console.log(`Received message: ${data}`);
    return 'Message sent successfully!';
  }
}
