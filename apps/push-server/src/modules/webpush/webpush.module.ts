// ** Nest Imports
import { Module } from '@nestjs/common';

// ** Custom Module Imports
import WebPushService from './service/webpush.service';
import WebPushController from './controller/webpush.controller';

@Module({
  imports: [],
  providers: [WebPushService],
  exports: [WebPushService],
  controllers: [WebPushController],
})
export default class WebPushModule {}
