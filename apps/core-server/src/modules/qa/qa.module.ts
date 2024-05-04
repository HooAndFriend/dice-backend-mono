// ** Nest Imports
import { Module, forwardRef } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';

// ** Typeorm Imports
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmExModule } from '../../global/repository/typeorm-ex.module';

// ** Custom Module Imports
import QaController from './controller/qa.controller';
import QaRepository from './repository/qa.repository';
import CommentRepository from './repository/qa.comment.repository';
import FileRepository from './repository/qa.file.repository';
import QaService from './service/qa.service';
import CommentService from './service/qa.comment.service';
import UserModule from '../user/user.module';
import { QaSendChangeHistoryListener } from './listener/qa.listener';
import WorkspaceModule from '../workspace/workspace.module';

// ** Entity Imports
import Qa from './domain/qa.entity';
import Comment from './domain/qa.comment.entity';
import File from './domain/qa.file.entity';
import { QaNotificationListener } from './listener/qa-notification.listener';
import QaCommentController from './controller/qa.comment.controller';
import QaFileController from './controller/qa.file.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Qa, Comment, File]),
    TypeOrmExModule.forCustomRepository([
      QaRepository,
      CommentRepository,
      FileRepository,
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

    forwardRef(() => WorkspaceModule),
    forwardRef(() => UserModule),
  ],
  exports: [TypeOrmExModule, TypeOrmModule, QaService, CommentService],
  controllers: [QaController, QaCommentController, QaFileController],
  providers: [
    QaService,
    CommentService,
    QaSendChangeHistoryListener,
    QaNotificationListener,
  ],
})
export default class QaModule {}
