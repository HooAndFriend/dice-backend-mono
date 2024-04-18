// ** Nest Imports
import { Injectable } from '@nestjs/common';

// ** Custom Module Imports
import NotificationRepository from '../repository/notification.repository';

// ** enum, dto, entity, types Imports

@Injectable()
export default class NotificationService {
  constructor(
    private readonly notificationRepository: NotificationRepository,
  ) {}
}
