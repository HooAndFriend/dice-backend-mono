// ** Swagger Imports
import { ApiProperty } from '@nestjs/swagger';

// ** Pipe Imports
import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';

export interface BoardContentInterface {
  time: number;
  version: string;
  blocks: any[];
}

export default class RequestBoardUpdateDto {
  @ApiProperty({ example: '게시글 이름' })
  @IsString()
  title: string;

  @ApiProperty({
    example: {
      time: 1632038400000,
      version: '1.0.0',
      blocks: [
        {
          id: '1',
          type: 'text',
          data: { text: '테스트' },
        },
      ],
    },
  })
  content: BoardContentInterface;

  @ApiProperty({ example: 1 })
  @IsNumber()
  boardId: number;
}
