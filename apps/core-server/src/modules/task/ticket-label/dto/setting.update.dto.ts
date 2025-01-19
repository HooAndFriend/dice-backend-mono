// ** Swagger Imports
import { ApiProperty } from '@nestjs/swagger';

// ** Pipe Imports
import { IsArray } from 'class-validator';
import TicketSettingEnum from '../domain/ticket.setting.enum';

export default class RequestSettingUpdateDto {
  @ApiProperty({
    example: [
      {
        settingId: 1,
        name: '123',
        type: TicketSettingEnum.BLACK,
        description: '123',
      },
    ],
  })
  @IsArray()
  data: SettingUpdate[];
}

export interface SettingUpdate {
  settingId: number;
  name: string;
  type: TicketSettingEnum;
  description: string;
}
