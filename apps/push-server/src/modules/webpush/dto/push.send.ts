// ** Pipe Imports
import { IsString } from 'class-validator';

export default class SendPushDto {
  constructor(fcmToken: string, title: string, body: string) {
    this.title = title;
    this.body = body;
    this.fcmToken = fcmToken;
  }

  @IsString()
  fcmToken: string;

  @IsString()
  title: string;

  @IsString()
  body: string;
}
