// ** Swagger Imports
import { TicketStatus } from '@/src/common/enum/ticket.enum';
import { ApiProperty } from '@nestjs/swagger';

// ** Pipe Imports
import { IsEnum, IsNumber } from 'class-validator';

export default class RequestTicketStateUpdateDto {
  @ApiProperty({ example: 2 })
  @IsNumber()
  ticketId: number;

  @ApiProperty({ example: TicketStatus.Doing, enum: TicketStatus })
  @IsEnum(TicketStatus)
  status: TicketStatus;
}
