// ** Swagger Imports
import { ApiProperty } from '@nestjs/swagger';

// ** Pipe Imports
import { IsString } from 'class-validator';
export default class RequestQaUpdateDto {
  @ApiProperty({ example: 'COMPLETE' })
  @IsString()
  status: string;
}
