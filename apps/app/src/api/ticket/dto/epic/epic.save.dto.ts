// ** Swagger Imports
import { ApiProperty } from '@nestjs/swagger';

// ** Pipe Imports
import { IsNumber, IsString } from 'class-validator';

export default class RequestEpicSaveDto {
  @ApiProperty({ example: 3 })
  @IsNumber()
  workspaceId: number;

  @ApiProperty({ example: 'DICE 로그인' })
  @IsString()
  name: string;
}