// ** Nest Imports
import { Injectable } from '@nestjs/common';

// ** Custom Module Imports
import NotificationRepository from '../repository/notification.repository';

// ** enum, dto, entity, types Imports
import SaveNotificatioNDto from '../dto/notification.save.dto';
import { NotFoundException } from '@repo/common';
import NotificationStatusEnum from '../domain/notification-status.enum';

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

  /**
   * Find Notification By Email
   * @param email
   * @returns
   */
  public async findNotificationByEmail(email: string) {
    return await this.notificationRepository.findAndCount({ where: { email } });
  }

  /**
   * Find Notification By Id
   * @param id
   * @returns
   */
  public async findNotificationById(id: number) {
    const notification = await this.notificationRepository.findOne({
      where: { id },
    });

    if (!notification) {
      throw new NotFoundException('Not Found Notification');
    }

    return notification;
  }

  /**
   * 알림 읽음 처리
   * @param id
   */
  public async updateNotificationStatus(id: number) {
    await this.notificationRepository.update(id, {
      status: NotificationStatusEnum.READ,
    });
  }

  /**
   * 알림 전체 읽음 처리
   * @param id
   */
  public async updateNotificationAllStatus(ids: number[]) {
    await this.notificationRepository.update(ids, {
      status: NotificationStatusEnum.READ,
    });
  }

  /**
   * 알림 존재 여부 확인
   * @param id
   */
  public async existedNotification(id: number) {
    const notification = await this.notificationRepository.exist({
      where: { id },
    });

    if (!notification) {
      throw new NotFoundException('Not Found Notification');
    }
  }
}
