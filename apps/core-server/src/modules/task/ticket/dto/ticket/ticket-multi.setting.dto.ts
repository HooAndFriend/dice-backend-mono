// ** Swagger Imports
import { ApiProperty } from '@nestjs/swagger';

// ** Pipe Imports
import { IsArray, IsNumber } from 'class-validator';

export default class RequestMultiTicketSettingUpdateDto {
  @ApiProperty({ example: [2] })
  @IsArray()
  ticketIds: number[];

  @ApiProperty({ example: 1 })
  @IsNumber()
  settingId: number;
}
