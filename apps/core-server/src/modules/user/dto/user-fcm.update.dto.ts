// ** Swagger Imports
import { ApiProperty } from '@nestjs/swagger';

// ** Pipe Imports
import { IsString } from 'class-validator';

export default class RequestUserFcmUpdateDto {
  @ApiProperty({ example: '123asdasd' })
  @IsString()
  fcmToken: string;
}
