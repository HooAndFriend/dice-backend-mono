// ** Nest Imports
import { Controller } from '@nestjs/common';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';

// ** Module Imports
import MailService from '../service/mail.service';

// ** Swagger Imports
import { ApiResponse, ApiTags } from '@nestjs/swagger';

// ** Response Imports
import {
  createServerExceptionResponse,
  createUnauthorizedResponse,
} from '@/src/global/response/common';

// ** Dto Imports
import SendMailDto from '../dto/mail.send.dto';

@ApiTags('Mail')
@ApiResponse(createServerExceptionResponse())
@ApiResponse(createUnauthorizedResponse())
@Controller({ path: '/mail', version: '1' })
export default class MailController {
  constructor(private readonly mailService: MailService) {}

  @MessagePattern({ cmd: 'send-single-mail' })
  async handleMessage(
    @Payload() data: SendMailDto,
    @Ctx() context: RmqContext,
  ): Promise<void> {
    console.log(data);
    await this.mailService.sendMail(data);
  }
}
