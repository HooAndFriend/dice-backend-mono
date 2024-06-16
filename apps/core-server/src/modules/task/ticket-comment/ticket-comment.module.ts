// ** Nest Imports
import { Module, forwardRef } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';

// ** Typeorm Imports
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmExModule } from '@/src/global/repository/typeorm-ex.module';

// ** Custom Module Imports
import TicketCommentRepository from './repository/ticket.comment.repository';
import TicketCommentController from './controller/ticket.comment.controller';
import TicketCommentService from './service/ticket.comment.service';
import TicketModule from '../ticket/ticket.module';
import WorkspaceModule from '../../workspace/workspace.module';

// ** entity Imports
import TicketComment from './domain/ticket.comment.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([TicketComment]),
    TypeOrmExModule.forCustomRepository([TicketCommentRepository]),
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
    forwardRef(() => TicketModule),
    forwardRef(() => WorkspaceModule),
  ],
  exports: [TypeOrmExModule, TypeOrmModule, TicketCommentService],
  controllers: [TicketCommentController],
  providers: [TicketCommentService],
})
export default class TicketCommentModule {}
