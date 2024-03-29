// ** Swagger Imports
import { ApiProperty } from '@nestjs/swagger';

// ** Pipe Imports
import { IsDateString, IsNumber, IsOptional, Matches } from 'class-validator';

export default class RequestEpicDueDateUpdateDto {
  @ApiProperty({ example: 2 })
  @IsNumber()
  epicId: number;

  @ApiProperty({ example : '2024-04-04', required : false})
  @IsOptional()
  @Matches(/^\d{4}-\d{2}-\d{2}$/)
  @IsDateString()
  dueDate : string;
}
