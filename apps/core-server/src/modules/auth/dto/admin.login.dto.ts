// ** Swagger Imports
import { ApiProperty } from '@nestjs/swagger';

// ** Pipe Imports
import { IsString } from 'class-validator';

export default class RequestAdminLoginDto {
  @ApiProperty({ example: 'admin' })
  @IsString()
  email: string;

  @ApiProperty({ example: '1234' })
  @IsString()
  password: string;
}
