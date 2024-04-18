import { Module } from '@nestjs/common';
import MailModule from './mail/mail.module';
import WebPushModule from './webpush/webpush.module';
import NotificationModule from './notification/notification.module';

@Module({
  imports: [MailModule, WebPushModule, NotificationModule],
  providers: [],
  exports: [],
  controllers: [],
})
export default class PushModule {}
