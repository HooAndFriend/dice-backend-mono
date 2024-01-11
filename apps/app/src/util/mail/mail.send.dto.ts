// ** Pipe Imports
import { IsString } from 'class-validator';

export default class SendMailDto {
  @IsString()
  email: string;

  @IsString()
  subject: string;

  @IsString()
  text: string;
}
