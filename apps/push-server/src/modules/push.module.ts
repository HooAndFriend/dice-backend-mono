import { Module } from '@nestjs/common';
import MailModule from './mail/mail.module';
import WebPushModule from './webpush/webpush.module';

@Module({
  imports: [MailModule, WebPushModule],
  providers: [],
  exports: [],
  controllers: [],
})
export default class PushModule {}
