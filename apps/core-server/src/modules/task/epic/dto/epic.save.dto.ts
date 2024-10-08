// ** Swagger Imports
import { ApiProperty } from '@nestjs/swagger';

// ** Pipe Imports
import { IsString } from 'class-validator';

export default class RequestEpicSaveDto {
  @ApiProperty({ example: 'DICE 로그인' })
  @IsString()
  name: string;
}
