// ** Swagger Imports
import { ApiProperty } from '@nestjs/swagger';

// ** Pipe Imports
import { IsNumber } from 'class-validator';

export default class RequestTicketEpicUpdateDto {
  @ApiProperty({ example: 2 })
  @IsNumber()
  ticketId: number;

  @ApiProperty({ example: 2 })
  @IsNumber()
  epicId: number;
}
