// ** Swagger Imports
import { ApiProperty } from '@nestjs/swagger';

// ** Pipe Imports
import { IsString } from 'class-validator';

export default class RequestSettingSaveDto {
  @ApiProperty({ example: 'ffffff' })
  @IsString()
  color: string;

  @ApiProperty({ example: 'SCN' })
  @IsString()
  type: string;

  @ApiProperty({ example: 'description' })
  @IsString()
  description: string;
}
