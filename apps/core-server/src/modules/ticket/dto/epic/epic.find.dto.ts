// ** Swagger Imports
import { ApiProperty } from '@nestjs/swagger';

// ** Pipe Imports
import { IsOptional, IsString } from 'class-validator';

export default class RequestEpicFindDto {
  @ApiProperty({ example: 'QA 제목입니다.', required: false })
  @IsString()
  @IsOptional()
  name: string;
}
