// ** Swagger Imports
import { ApiProperty } from '@nestjs/swagger';

// ** Pipe Imports
import { IsBoolean, IsString } from 'class-validator';

export default class RequestStateSaveDto {
  @ApiProperty({ example: '진행중' })
  @IsString()
  name: string;

  @ApiProperty({ example: '#FF0000' })
  @IsString()
  color: string;

  @ApiProperty({ example: '진행중인 티켓' })
  @IsString()
  description: string;

  @ApiProperty({ example: 'true' })
  @IsBoolean()
  exposeYn: boolean;
}
