// ** Swagger Imports
import { ApiProperty } from '@nestjs/swagger';

// ** Pipe Imports
import { IsEnum, IsNumber } from 'class-validator';
import PriorityEnum from '../../enum/priority.enum';

export default class RequestTicketPriorityUpdateDto {
  @ApiProperty({ example: 2 })
  @IsNumber()
  ticketId: number;

  @ApiProperty({ example: PriorityEnum.HIGH, enum: PriorityEnum })
  @IsEnum(PriorityEnum)
  priority: PriorityEnum;
}
