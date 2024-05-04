// ** Swagger Imports
import { ApiProperty } from '@nestjs/swagger';

// ** Pipe Imports
import { IsArray } from 'class-validator';

export default class RequestTicketDeleteDto {
  @ApiProperty({ example: [12, 3] })
  @IsArray()
  ticketIds: number[];
}
