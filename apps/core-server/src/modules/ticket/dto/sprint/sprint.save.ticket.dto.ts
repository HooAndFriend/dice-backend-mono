// ** Swagger Imports
import { ApiProperty } from '@nestjs/swagger';
// ** Pipe Imports
import { IsNumber } from 'class-validator';

export default class RequestSprintSaveTicketDto {
  @ApiProperty({ example: 1 })
  @IsNumber()
  sprintId: number;

  @ApiProperty({ example: 1 })
  @IsNumber()
  ticketId: number;
}
