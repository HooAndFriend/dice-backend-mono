// ** Nest Imports
import { Controller, Logger } from '@nestjs/common';
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
import { SendMailDto } from '@hi-dice/common';

@ApiTags('Mail')
@ApiResponse(createServerExceptionResponse())
@ApiResponse(createUnauthorizedResponse())
@Controller({ path: '/mail', version: '1' })
export default class MailController {
  private readonly logger = new Logger(MailController.name);
  constructor(private readonly mailService: MailService) {}

  @MessagePattern('send-single-mail')
  async handleMessage(
    @Payload() data: SendMailDto,
    @Ctx() context: RmqContext,
  ): Promise<void> {
    this.logger.log(
      `Send Mail ${JSON.stringify(data.email)} : ${data.subject}`,
    );
    // await this.mailService.sendMail(data);
  }
}
