// ** Nest Imports
import { Module, forwardRef } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';

// ** Typeorm Imports
import { TypeOrmModule } from '@nestjs/typeorm';

// ** Custom Module Imports
import { TypeOrmExModule } from '../../global/repository/typeorm-ex.module';
import TicketController from './controller/ticket.controller';
import TicketService from './service/ticket.service';
import EpicRepository from './repository/epic.repository';
import TicketRepository from './repository/ticket.repository';
import TicketFileRepository from './repository/ticket.file.repository';
import WorkspaceModule from '../workspace/workspace.module';
import TicketSettingRepository from './repository/ticket.setting.repository';
import TicketCommentRepository from './repository/ticket.comment.repository';
import StateRepository from './repository/state.repository';
import StateService from './service/state.service';
import StateController from './controller/state.controller';
import EpicController from './controller/epic.controller';
import TicketCommentController from './controller/ticket.comment.controller';
import { TicketSendChangeHistoryListener } from './listener/ticket.listener';

// ** entity Imports
import Epic from './domain/epic.entity';
import Ticket from './domain/ticket.entity';
import TicketFile from './domain/ticket.file.entity';
import UserModule from '../user/user.module';
import TicketComment from './domain/ticket.comment.entity';
import TicketSetting from './domain/ticket.setting.entity';
import State from './domain/state.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Epic,
      Ticket,
      TicketFile,
      TicketComment,
      TicketSetting,
      State,
    ]),
    TypeOrmExModule.forCustomRepository([
      EpicRepository,
      TicketRepository,
      TicketFileRepository,
      TicketCommentRepository,
      TicketSettingRepository,
      StateRepository,
    ]),
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
    forwardRef(() => UserModule),
  ],
  exports: [TypeOrmExModule, TypeOrmModule, TicketService, StateService],
  controllers: [
    TicketController,
    StateController,
    EpicController,
    TicketCommentController,
  ],
  providers: [TicketService, StateService, TicketSendChangeHistoryListener],
})
export default class TicketModule {}
