// ** Swagger Imports
import { ApiProperty } from '@nestjs/swagger';

// ** Pipe Imports
import { IsNumber, IsOptional, IsString } from 'class-validator';

export default class RequestSimpleTicketSaveDto {
  @ApiProperty({ example: '게시판' })
  @IsString()
  name: string;

  @ApiProperty({ example: 1, required: false })
  @IsOptional()
  @IsNumber()
  typeId: number;
}
