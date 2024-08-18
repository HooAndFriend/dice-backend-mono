// ** Swagger Imports
import { ApiProperty } from '@nestjs/swagger';

// ** Pipe Imports
import { IsNumber, IsOptional, IsString } from 'class-validator';

export default class RequestTicketSaveDto {
  @ApiProperty({ example: '게시판' })
  @IsString()
  name: string;

  @ApiProperty({ example: 1, required: false })
  @IsOptional()
  @IsNumber()
  settingId: number;

  @ApiProperty({ example: 1, required: false })
  @IsOptional()
  @IsNumber()
  epicId: number;
}
