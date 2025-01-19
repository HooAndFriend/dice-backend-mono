// ** Swagger Imports
import { ApiProperty } from '@nestjs/swagger';

// ** Pipe Imports
import { IsEnum, IsString } from 'class-validator';

// ** Enum Imports
import TicketSettingEnum from '../domain/ticket.setting.enum';

export default class RequestSettingSaveDto {
  @ApiProperty({ example: 'SCN' })
  @IsString()
  name: string;

  @ApiProperty({ example: '해당 타입은 이거 입니다.' })
  @IsString()
  description: string;

  @ApiProperty({ example: TicketSettingEnum.BLACK, enum: TicketSettingEnum })
  @IsEnum(TicketSettingEnum)
  type: TicketSettingEnum;
}
