// ** Swagger Imports
import { ApiProperty } from '@nestjs/swagger';

// ** Pipe Imports
import { IsNumber, IsString } from 'class-validator';

export default class RequestSettingUpdateDto {
  @ApiProperty({ example: 1 })
  @IsNumber()
  settingId: number;

  @ApiProperty({ example: 'ffffff' })
  @IsString()
  color: string;

  @ApiProperty({ example: 'SCN' })
  @IsString()
  type: string;

  @ApiProperty({ example: 'description' })
  @IsString()
  description: string;
}
