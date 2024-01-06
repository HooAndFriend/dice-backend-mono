// ** Swagger Imports
import { ApiProperty } from '@nestjs/swagger';

// ** Pipe Imports
import { IsArray, IsDate, IsNumber, IsString } from 'class-validator';

export default class RequestTicketUpdateDto {
  @ApiProperty({ example: 2 })
  @IsNumber()
  ticketId: number;

  @ApiProperty({ example: 'DICE 게시판' })
  @IsString()
  name: string;

  @ApiProperty({ example: 3 })
  @IsNumber()
  settingId: number;

  @ApiProperty({ example: 1 })
  @IsNumber()
  workerId: number;

  @ApiProperty({ example: 1 })
  @IsNumber()
  storypoint: number;

  @ApiProperty({ example: '상세보기 추가' })
  @IsString()
  content: string;

  @ApiProperty({ example: '2024-01-24' })
  @IsDate()
  dueDate: Date;

  @ApiProperty({ example: [1, 2, 3, 4] })
  @IsArray()
  file: number[];
}
