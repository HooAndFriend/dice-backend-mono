// ** Swagger Imports
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

// ** Pipe Imports
import { IsDate, IsEnum, IsNumber, IsString } from 'class-validator';
export default class RequestQaDueDateUpdateDto {
  @ApiProperty({ example: 1 })
  @IsNumber()
  qaId: number;

  @ApiProperty({ example: "2024-04-12"})
  @IsDate()
  @Type(() => Date)
  dueDate: Date;
}
