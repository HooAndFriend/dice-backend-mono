// ** Nest Imports
import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

// ** Custom Module Imports
import NotificationService from '../service/notification.service';

// ** Dto Imports
import SaveNotificatioNDto from '../dto/notification.save.dto';
import SaveMultiNotificatioNDto from '../dto/notification-multi.save.dto';

@Injectable()
export class NotificationListener {
  constructor(private readonly notificationService: NotificationService) {}

  private logger = new Logger(NotificationService.name);

  /**
   * 유저 알림 이벤트를 수신하여 저장합니다.
   * @param event
   */
  @OnEvent('notification.save-notification')
  public async handleSaveNotification(event: SaveNotificatioNDto) {
    await this.notificationService.saveNotification(event);
  }

  /**
   * 유저 알림 이벤트 리스트를 수신하여 저장합니다.
   * @param event
   */
  @OnEvent('notification.save-multi-notification')
  public async handleSaveMultiNotification(event: SaveMultiNotificatioNDto) {
    for await (const item of event.email) {
      await this.notificationService.saveNotification(
        event.getSaveNotificationDto(item),
      );
    }
  }
}
