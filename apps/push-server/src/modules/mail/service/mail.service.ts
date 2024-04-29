// ** Nest Imports
import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

// ** enum, dto, entity, types Imports
import { SendMailDto } from '@hi-dice/common';

@Injectable()
export default class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendMail(dto: SendMailDto): Promise<void> {
    await this.mailerService.sendMail({
      to: dto.email,
      from: process.env.MAIL_EMAIL,
      subject: dto.subject,
      text: dto.text,
    });
  }
}
