// ** Swagger Imports
import { ApiProperty } from '@nestjs/swagger';

// ** Pipe Imports
import { IsNumber, IsString } from 'class-validator';

export default class RequestTicketLinkSaveDto {
  @ApiProperty({ example: 1, description: '링크를 걸려하는 Ticket ID' })
  @IsNumber()
  parentTicketId: number;

  @ApiProperty({ example: 2, description: '링크를 걸려하는 대상 Ticket ID' })
  @IsNumber()
  childTicketId: number;
}
