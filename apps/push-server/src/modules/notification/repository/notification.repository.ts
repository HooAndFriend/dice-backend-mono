// ** Typeorm Imports
import { Repository } from 'typeorm';

// ** Custom Module Imports
import CustomRepository from '@/src/global/repository/typeorm-ex.decorator';

// ** enum, dto, entity, types Imports
import Notification from '../domain/notification.entity';

@CustomRepository(Notification)
export default class NotificationRepository extends Repository<Notification> {}
