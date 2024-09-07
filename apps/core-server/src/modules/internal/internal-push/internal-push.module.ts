// ** Nest Imports
import { Module, forwardRef } from '@nestjs/common';

// ** Custom Module Imports
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';
import InternalPushService from './service/internal-push.service';
import { InternalPushListener } from './listener/internal-push.listener';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: 'RMQ_PUSH_QUE',
        imports: [ConfigModule],
        useFactory: (configService: ConfigService) => ({
          transport: Transport.RMQ,
          options: {
            urls: [configService.get<string>('RMQ_URL')],
            queue: configService.get<string>('RMQ_PUSH_QUE'),
            queueOptions: {
              durable: false,
            },
          },
        }),
        inject: [ConfigService],
      },
    ]),
  ],
  providers: [InternalPushService, InternalPushListener],
  exports: [InternalPushService],
  controllers: [],
})
export default class InternalPushModule {}
