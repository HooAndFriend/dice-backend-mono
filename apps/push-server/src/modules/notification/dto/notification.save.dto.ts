import { IsEnum, IsString } from 'class-validator';

// ** Dto Imports
import NotificationStatusEnum from '../domain/notification-status.enum';
import NotificationTypeEnum from '../domain/notification-type.enum';

export default class SaveNotificatioNDto {
  constructor(
    email: string,
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

  @IsString()
  email: string;

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
}
