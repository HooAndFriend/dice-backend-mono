import { IsArray, IsEnum, IsString } from 'class-validator';

// ** Dto Imports
import NotificationStatusEnum from '../domain/notification-status.enum';
import NotificationTypeEnum from '../domain/notification-type.enum';
import SaveNotificatioNDto from './notification.save.dto';

export default class SaveMultiNotificatioNDto {
  constructor(
    email: string[],
    title: string,
    body: string,
    status: NotificationStatusEnum,
    type: NotificationTypeEnum,
    subId: number,
  ) {
    this.email = email;
    this.title = title;
    this.body = body;
    this.status = status;
    this.type = type;
    this.subId = subId;
  }

  @IsArray()
  email: string[];

  @IsString()
  title: string;

  @IsString()
  body: string;

  @IsEnum(NotificationStatusEnum)
  status: NotificationStatusEnum;

  @IsEnum(NotificationTypeEnum)
  type: NotificationTypeEnum;

  @IsString()
  subId: number;

  /**
   * Get SaveNotificationDto
   * @param email
   * @param fcmToken
   * @returns
   */
  public getSaveNotificationDto(email: string) {
    return new SaveNotificatioNDto(
      email,
      this.title,
      this.body,
      this.status,
      this.type,
      this.subId,
    );
  }
}
