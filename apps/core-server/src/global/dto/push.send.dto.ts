// ** Pipe Imports
import { IsEnum, IsString } from 'class-validator';

// ** Dto Imports
import NotificationStatusEnum from '../enum/notification-status.enum';
import NotificationTypeEnum from '../enum/notification-type.enum';

export default class SendPushDto {
  @IsString()
  fcmToken: string;

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
