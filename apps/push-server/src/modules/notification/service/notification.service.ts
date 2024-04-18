// ** Nest Imports
import { Injectable } from '@nestjs/common';

// ** Custom Module Imports
import NotificationRepository from '../repository/notification.repository';

// ** enum, dto, entity, types Imports
import SaveNotificatioNDto from '../dto/notification.save.dto';

@Injectable()
export default class NotificationService {
  constructor(
    private readonly notificationRepository: NotificationRepository,
  ) {}

  /**
   * Save Notification
   * @param dto
   */
  public async saveNotification(dto: SaveNotificatioNDto) {
    await this.notificationRepository.save(
      this.notificationRepository.create({
        title: dto.title,
        body: dto.body,
        email: dto.email,
        type: dto.type,
        status: dto.status,
        subId: dto.subId,
      }),
    );
  }
}
