// ** Nest Imports
import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';

// ** Custom Module Imports
import MailService from './service/mail.service';
import MailController from './controller/mail.controller';

@Module({
  imports: [
    MailerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        transport: {
          service: 'gmail',
          auth: {
            user: configService.get('MAIL_EMAIL'),
            pass: configService.get('MAIL_PASSWORD'),
          },
        },
      }),
    }),
  ],
  exports: [],
  controllers: [MailController],
  providers: [MailService],
})
export default class MailModule {}
