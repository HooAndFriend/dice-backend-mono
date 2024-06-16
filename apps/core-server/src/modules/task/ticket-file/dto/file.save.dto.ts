// ** Swagger Imports
import { ApiProperty } from '@nestjs/swagger';

// ** Pipe Imports
import { IsNumber, IsString } from 'class-validator';

export default class RequestTicketFileSaveDto {
  @ApiProperty({ example: 2 })
  @IsNumber()
  ticketId: number;

  @ApiProperty({ example: 'https://123123' })
  @IsString()
  file: string;
}
