// ** Swagger Imports
import { ApiProperty } from '@nestjs/swagger';

// ** Pipe Imports
import { IsDateString, IsNumber, Matches } from 'class-validator';
export default class RequestQaDueDateUpdateDto {
  @ApiProperty({ example: 1 })
  @IsNumber()
  qaId: number;

  @ApiProperty({ example: '2024-04-04', required: true })
  @Matches(/^\d{4}-\d{2}-\d{2}$/)
  @IsDateString()
  dueDate: string;
}
