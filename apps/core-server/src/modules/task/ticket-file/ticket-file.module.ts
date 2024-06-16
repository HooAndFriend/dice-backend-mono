// ** Nest Imports
import { Module, forwardRef } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';

// ** Typeorm Imports
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmExModule } from '@/src/global/repository/typeorm-ex.module';

// ** Custom Module Imports
import TicketFileRepository from './repository/ticket.file.repository';
import TicketFileController from './controller/ticket.file.controller';
import TicketFileService from './service/ticket.file.service';
import WorkspaceModule from '../../workspace/workspace.module';
import TicketModule from '../ticket/ticket.module';

// ** entity Imports
import TicketFile from './domain/ticket.file.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([TicketFile]),
    TypeOrmExModule.forCustomRepository([TicketFileRepository]),
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
  exports: [TypeOrmExModule, TypeOrmModule, TicketFileService],
  controllers: [TicketFileController],
  providers: [TicketFileService],
})
export default class TicketFileModule {}
