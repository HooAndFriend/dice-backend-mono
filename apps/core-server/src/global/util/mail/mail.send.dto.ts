// ** Pipe Imports
import { IsOptional, IsString } from 'class-validator';

export default class SendMailDto {
  constructor(email: string, subject: string, text: string, html: string) {
    this.email = email;
    this.subject = subject;
    this.text = text;
    this.html = html;
  }

  @IsString()
  email: string;

  @IsString()
  subject: string;

  @IsString()
  text: string;

  @IsString()
  @IsOptional()
  html: string;
}
