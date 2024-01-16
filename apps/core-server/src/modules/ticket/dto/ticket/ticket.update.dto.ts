// ** Swagger Imports
import { ApiProperty } from '@nestjs/swagger';

// ** Pipe Imports
import { IsArray, IsNumber, IsString } from 'class-validator';

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
  dueDate: string;

  @ApiProperty({
    example: [
      'https://firebasestorage.googleapis.com/v0/b/dice-dev-a5b63.appspot.com/o/images%2F%E%E1%.png',
    ],
  })
  @IsArray()
  file: Array<string>;
}
