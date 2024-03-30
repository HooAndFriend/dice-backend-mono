// ** Swagger Imports
import { ApiProperty } from '@nestjs/swagger';

// ** Pipe Imports
import { IsDateString, IsNumber, IsString, Matches } from 'class-validator';

export default class RequestTicketSaveDto {
  @ApiProperty({ example: 2 })
  @IsNumber()
  epicId: number;

  @ApiProperty({ example: '게시판' })
  @IsString()
  name: string;

  @ApiProperty({ example: '2024-04-04', required: true })
  @Matches(/^\d{4}-\d{2}-\d{2}$/)
  @IsDateString()
  dueDate: string;
}
