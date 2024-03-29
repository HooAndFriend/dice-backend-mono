// ** Swagger Imports
import { ApiProperty } from '@nestjs/swagger';

// ** Pipe Imports
import { IsDateString, IsNumber, IsOptional, Matches } from 'class-validator';
export default class RequestQaDueDateUpdateDto {
  @ApiProperty({ example: 1 })
  @IsNumber()
  qaId: number;

  @ApiProperty({ example : '2024-04-04', required : false})
  @Matches(/^\d{4}-\d{2}-\d{2}$/)
  @IsOptional()
  @IsDateString()
  dueDate : string;
}
