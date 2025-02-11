// ** Pipe Imports
import { IsArray, IsString } from 'class-validator';

// ** Dto Imports

export class SendMentionDto {
  @IsString()
  mentioner: string;

  @IsArray()
  @IsString({ each: true })
  mentioned_userIds: string[];
}
