// ** Nest Imports
import { Module, forwardRef } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';

// ** Typeorm Imports
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmExModule } from '@/src/global/repository/typeorm-ex.module';

// ** Custom Module Imports
import WorkspaceModule from '../../workspace/workspace.module';
import TicketModule from '../ticket/ticket.module';
import TicketLabel from './domain/ticket.label.entity';
import TicketLabelRepository from './repository/ticket.label.repository';
import TicketLabelService from './service/ticket.label.service';
import TicketLabelController from './controller/ticket.label.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([TicketLabel]),
    TypeOrmExModule.forCustomRepository([TicketLabelRepository]),
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
  exports: [TypeOrmExModule, TypeOrmModule, TicketLabelService],
  controllers: [TicketLabelController],
  providers: [TicketLabelService],
})
export default class TicketLabelModule {}
