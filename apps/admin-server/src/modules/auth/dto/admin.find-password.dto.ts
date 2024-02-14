// ** Swagger Imports
import { ApiProperty } from '@nestjs/swagger';

// ** Pipe Imports
import { IsString } from 'class-validator';

export default class RequestAdminFindPasswordDto {
  @ApiProperty({ example: 'admin' })
  @IsString()
  email: string;
}
