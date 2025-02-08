import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString } from 'class-validator';

// ** Dto Imports

export default class SendSSEMessageDto {
  @ApiProperty({ example: ['userId1', 'userId2'] })
  @IsArray()
  @IsString({ each: true })
  userIds: string[];
}
