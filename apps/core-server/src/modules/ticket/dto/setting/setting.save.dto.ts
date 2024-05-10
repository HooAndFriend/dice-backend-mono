// ** Swagger Imports
import { ApiProperty } from '@nestjs/swagger';

// ** Pipe Imports
import { IsEnum, IsString } from 'class-validator';
import TicketSettingEnum from '../../domain/ticket.setting.enum';

export default class RequestSettingSaveDto {
  @ApiProperty({ example: 'SCN' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'description' })
  @IsString()
  description: string;

  @ApiProperty({ example: TicketSettingEnum.OTHER, enum: TicketSettingEnum })
  @IsEnum(TicketSettingEnum)
  type: TicketSettingEnum;
}
