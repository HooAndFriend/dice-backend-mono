// ** Nest Imports
import { Module, forwardRef } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';

// ** Typeorm Imports
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmExModule } from '@/src/global/repository/typeorm-ex.module';

// ** Custom Module Imports
import TicketService from './service/ticket.service';
import TicketController from './controller/ticket.controller';
import TicketRepository from './repository/ticket.repository';
import { TicketSendChangeHistoryListener } from './listener/ticket.listener';
import TicketFileModule from '../ticket-file/ticket-file.module';
import TicketCommentModule from '../ticket-comment/ticket-comment.module';
import UserModule from '../../user/user.module';
import WorkspaceModule from '../../workspace/workspace.module';
import TicketSettingModule from '../ticket-setting/ticket-setting.module';

// ** entity Imports
import Ticket from './domain/ticket.entity';
import EpicModule from '../epic/epic.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Ticket]),
    TypeOrmExModule.forCustomRepository([TicketRepository]),
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
    forwardRef(() => TicketFileModule),
    forwardRef(() => TicketCommentModule),
    forwardRef(() => UserModule),
    forwardRef(() => WorkspaceModule),
    forwardRef(() => TicketSettingModule),
    forwardRef(() => EpicModule),
  ],
  exports: [TypeOrmExModule, TypeOrmModule, TicketService],
  controllers: [TicketController],
  providers: [TicketService, TicketSendChangeHistoryListener],
})
export default class TicketModule {}
