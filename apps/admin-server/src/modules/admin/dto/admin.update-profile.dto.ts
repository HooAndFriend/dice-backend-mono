// ** Swagger Imports
import { ApiProperty } from '@nestjs/swagger';

// ** Pipe Imports
import { IsString } from 'class-validator';

export default class RequestAdminProfileUpdateDto {
  @ApiProperty({ example: 'https://s3.bucket.com/123.png' })
  @IsString()
  profile: string;
}
