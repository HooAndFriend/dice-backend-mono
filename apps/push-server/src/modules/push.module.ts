// ** Nest Imports
import { Module, forwardRef } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

// ** Custom Module Imports
import MailModule from './mail/mail.module';
import WebPushModule from './webpush/webpush.module';
import NotificationModule from './notification/notification.module';
import AuthModule from './auth/auth.module';

@Module({
  imports: [
    PassportModule,
    // MailModule,
    NotificationModule,
    AuthModule,
    WebPushModule,
  ],
  providers: [],
  exports: [],
  controllers: [],
})
export default class PushModule {}
