// ** Pipe Imports
import { IsEnum, IsString } from 'class-validator';

// ** Dto Imports
import { NotificationStatusEnum, NotificationTypeEnum } from '@repo/common';

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
