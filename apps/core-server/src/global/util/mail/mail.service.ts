import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import SendMailDto from './mail.send.dto';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendMail(dto: SendMailDto): Promise<void> {
    await this.mailerService.sendMail({
      to: dto.email,
      from: process.env.MAIL_EMAIL,
      subject: dto.subject,
      text: dto.text,
      html: dto.html,
    });
  }
}
