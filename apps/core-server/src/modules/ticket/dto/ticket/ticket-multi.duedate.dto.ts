// ** Swagger Imports
import { ApiProperty } from '@nestjs/swagger';

// ** Pipe Imports
import { IsArray, IsDateString, Matches } from 'class-validator';

export default class RequestMultiTicketDueDateUpdateDto {
  @ApiProperty({ example: [2] })
  @IsArray()
  ticketIds: number[];

  @ApiProperty({ example: '2024-04-04', required: true })
  @Matches(/^\d{4}-\d{2}-\d{2}$/)
  @IsDateString()
  dueDate: string;
}
