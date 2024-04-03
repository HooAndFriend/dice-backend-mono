// ** Swagger Imports
import { ApiProperty } from '@nestjs/swagger';

// ** Pipe Imports
import { IsNumber, IsString } from 'class-validator';

export default class RequestTicketUserUpdateDto {
  @ApiProperty({ example: 1 })
  @IsNumber()
  ticketId: number;

  @ApiProperty({ example: 1 })
  @IsNumber()
  userId: number;

  @ApiProperty({ example: 'user' })
  @IsString()
  type: 'user' | 'admin';
}
