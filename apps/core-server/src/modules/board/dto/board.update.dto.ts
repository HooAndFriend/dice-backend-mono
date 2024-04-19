// ** Swagger Imports
import { ApiProperty } from '@nestjs/swagger';

// ** Pipe Imports
import { IsNumber, IsString } from 'class-validator';

export default class RequestBoardUpdateDto {
  @ApiProperty({ example: '게시글 이름' })
  @IsString()
  title: string;

  @ApiProperty({ example: '게시글 이름' })
  @IsString()
  content: string;

  @ApiProperty({ example: 1 })
  @IsNumber()
  boardId: number;
}
