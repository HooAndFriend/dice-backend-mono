// ** Swagger Imports
import { ApiProperty } from '@nestjs/swagger';

// ** Pipe Imports
import { IsNumber } from 'class-validator';

export default class RequestTicketSettingUpdateDto {
  @ApiProperty({ example: 2 })
  @IsNumber()
  ticketId: number;

  @ApiProperty({ example: 2 })
  @IsNumber()
  settingId: number;
}
