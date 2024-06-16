// ** Nest Imports
import { Module, forwardRef } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';

// ** Typeorm Imports
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmExModule } from '@/src/global/repository/typeorm-ex.module';

// ** Custom Module Imports
import TicketSettingRepository from './repository/ticket.setting.repository';
import TicketSettingService from './service/ticket.setting.service';
import TicketSettingController from './controller/ticket.setting.controller';
import WorkspaceModule from '../../workspace/workspace.module';
import TicketModule from '../ticket/ticket.module';

// ** entity Imports
import TicketSetting from './domain/ticket.setting.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([TicketSetting]),
    TypeOrmExModule.forCustomRepository([TicketSettingRepository]),
    ClientsModule.registerAsync([
      {
        name: 'RMQ_LOG_QUE',
        imports: [ConfigModule],
        useFactory: (configService: ConfigService) => ({
          transport: Transport.RMQ,
          options: {
            urls: [configService.get<string>('RMQ_URL')],
            queue: configService.get<string>('RMQ_LOG_QUE'),
            queueOptions: {
              durable: false,
            },
          },
        }),
        inject: [ConfigService],
      },
    ]),
    forwardRef(() => WorkspaceModule),
    forwardRef(() => TicketModule),
  ],
  exports: [TypeOrmExModule, TypeOrmModule, TicketSettingService],
  controllers: [TicketSettingController],
  providers: [TicketSettingService],
})
export default class TicketSettingModule {}
