// ** Pipe Imports
import { IsArray, IsString } from 'class-validator';

export default class SendMultiPushDto {
  constructor(fcmToken: string[], title: string, body: string) {
    this.title = title;
    this.body = body;
    this.fcmToken = fcmToken;
  }

  @IsArray()
  fcmToken: string[];

  @IsString()
  title: string;

  @IsString()
  body: string;
}
