// ** Nest Imports
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

// ** Custom Module Imports
import MailModule from './mail/mail.module';
import WebPushModule from './webpush/webpush.module';
import NotificationModule from './notification/notification.module';
import JwtAccessStrategy from '../global/guard/auth.jwt-access.strategy';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get('JWT_ACCESS_TOKEN_SECRET'),
        signOptions: {
          expiresIn: config.get('JWT_ACCESS_TOKEN_EXPIRATION_TIME'),
        },
      }),
    }),
    MailModule,
    WebPushModule,
    NotificationModule,
  ],
  providers: [JwtAccessStrategy],
  exports: [],
  controllers: [],
})
export default class PushModule {}
