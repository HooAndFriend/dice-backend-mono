// ** Swagger Imports
import { ApiProperty } from '@nestjs/swagger';

// ** Pipe Imports
import { IsString } from 'class-validator';
export default class RequestUserUpdateDto {
  @ApiProperty({ example: '피노피노얍' })
  @IsString()
  nickname: string;

  @ApiProperty({ example: 'http://loasdasd.com' })
  @IsString()
  profile: string;
}
