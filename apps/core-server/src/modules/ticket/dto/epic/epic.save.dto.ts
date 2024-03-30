// ** Swagger Imports
import { ApiProperty } from '@nestjs/swagger';

// ** Pipe Imports
import { IsDateString, IsString, Matches } from 'class-validator';

export default class RequestEpicSaveDto {
  @ApiProperty({ example: 'DICE 로그인' })
  @IsString()
  name: string;

  @ApiProperty({ example: '2024-04-04', required: true })
  @Matches(/^\d{4}-\d{2}-\d{2}$/)
  @IsDateString()
  dueDate: string;
}
