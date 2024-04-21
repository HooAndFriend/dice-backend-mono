// ** Swagger Imports
import { ApiProperty } from '@nestjs/swagger';

// ** Pipe Imports
import { IsString } from 'class-validator';

export default class RequestCsCategorySaveDto {
  @ApiProperty({ example: '전체' })
  @IsString()
  name: string;
}
