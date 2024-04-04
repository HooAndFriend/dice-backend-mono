// ** Swagger Imports
import { ApiProperty } from '@nestjs/swagger';

// ** Pipe Imports
import { IsNumber, IsOptional, IsString } from 'class-validator';

export default class RequestTicketSimpleUpdateDto {
  @ApiProperty({ example: 2 })
  @IsNumber()
  ticketId: number;

  @ApiProperty({ example: 'DICE 게시판' })
  @IsString()
  value: string;

  @ApiProperty({ example: 30, required: false })
  @IsOptional()
  @IsNumber()
  storypoint: number;

  @ApiProperty({ example: 'content' })
  @IsNumber()
  type: 'content' | 'name' | 'storypoint';
}
