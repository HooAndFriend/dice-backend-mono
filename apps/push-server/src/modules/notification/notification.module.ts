// ** Nest Imports
import { Module } from '@nestjs/common';

// ** Custom Module Imports
import NotificationController from './controller/notification.controller';
import NotificationService from './service/notification.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmExModule } from '@/src/global/repository/typeorm-ex.module';
import NotificationRepository from './repository/notification.repository';
import { NotificationListener } from './listener/notification.listener';

// ** Entity Imports
import Notification from './domain/notification.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Notification]),
    TypeOrmExModule.forCustomRepository([NotificationRepository]),
  ],
  providers: [NotificationService, NotificationListener],
  exports: [NotificationService],
  controllers: [NotificationController],
})
export default class NotificationModule {}
