// ** Swagger Imports
import { ApiProperty } from '@nestjs/swagger';

// ** Pipe Imports
import { IsString } from 'class-validator';

export default class RequestSimpleQaSaveDto {
  @ApiProperty({ example: 'QA 제목입니다.' })
  @IsString()
  title: string;

  @ApiProperty({ example: 'QA 제목입니다.' })
  @IsString()
  number: string;
}
