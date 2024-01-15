// ** Pipe Imports
import { IsString } from 'class-validator';

export default class SendMailDto {
  constructor(email: string, subject: string, text: string) {
    this.email = email;
    this.subject = subject;
    this.text = text;
  }

  @IsString()
  email: string;

  @IsString()
  subject: string;

  @IsString()
  text: string;
}
