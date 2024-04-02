// ** Nest Imports
import { Module, forwardRef } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';

// ** Typeorm Imports
import { TypeOrmModule } from '@nestjs/typeorm';

// ** Custom Module Imports
import QaController from './controller/qa.controller';
import QaRepository from './repository/qa.repository';
import CommentRepository from './repository/comment.repository';
import UserRepository from '@/src/modules/user/repository/user.repository';
import FileRepository from './repository/file.repository';
import WorkspaceRepository from '@/src/modules/workspace/repository/workspace.repository';
import QaService from './service/qa.service';
import CommentService from './service/comment.service';
import Qa from './domain/qa.entity';
import Comment from './domain/comment.entity';
import { TypeOrmExModule } from '../../global/repository/typeorm-ex.module';
import UserModule from '../user/user.module';
import { QaSendChangeHistoryListener } from './listener/qa.listener';
import WorkspaceModule from '../workspace/workspace.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Qa, Comment]),
    TypeOrmExModule.forCustomRepository([
      QaRepository,
      CommentRepository,
      UserRepository,
      FileRepository,
      WorkspaceRepository,
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
  exports: [TypeOrmExModule, TypeOrmModule, QaService, CommentService],
  controllers: [QaController],
  providers: [QaService, CommentService, QaSendChangeHistoryListener],
})
export default class QaModule {}
