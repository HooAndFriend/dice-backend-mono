// ** Pipe Imports
import { IsArray, IsEnum, IsString } from 'class-validator';

// ** Enum Imports
import NotificationStatusEnum from '../../notification/domain/notification-status.enum';
import NotificationTypeEnum from '../../notification/domain/notification-type.enum';

export default class SendMultiPushDto {
  @IsArray()
  fcmToken: string[];

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
}
