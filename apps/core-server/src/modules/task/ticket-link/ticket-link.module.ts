// ** Nest Imports
import { Module, forwardRef } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';

// ** Typeorm Imports
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmExModule } from '@/src/global/repository/typeorm-ex.module';

// ** Custom Module Imports
import TicketLinkController from './controller/ticket.link.controller';
import TicketLinkService from './service/ticket.link.service';
import WorkspaceModule from '../../workspace/workspace.module';
import TicketModule from '../ticket/ticket.module';

// ** entity Imports
import TicketLink from './domain/ticket.link.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([TicketLink]),
    TypeOrmExModule.forCustomRepository([]),
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
  exports: [TypeOrmExModule, TypeOrmModule, TicketLinkService],
  controllers: [TicketLinkController],
  providers: [TicketLinkService],
})
export default class TicketLinkModule {}
