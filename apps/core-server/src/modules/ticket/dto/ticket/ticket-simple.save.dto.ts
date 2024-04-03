// ** Swagger Imports
import { ApiProperty } from '@nestjs/swagger';

// ** Pipe Imports
import { IsNumber, IsString } from 'class-validator';

export default class RequestSimpleTicketSaveDto {
  @ApiProperty({ example: '게시판' })
  @IsString()
  name: string;
}
