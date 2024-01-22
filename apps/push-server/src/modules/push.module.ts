import { Module } from '@nestjs/common';
import MailModule from './mail/mail.module';

@Module({
  imports: [MailModule],
  providers: [],
  exports: [],
  controllers: [],
})
export default class PushModule {}
