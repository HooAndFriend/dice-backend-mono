// ** Swagger Imports
import { ApiProperty } from '@nestjs/swagger';

// ** Pipe Imports
import { IsNumber, IsString } from 'class-validator';

export default class RequestBoardUpdateDto {
  @ApiProperty({ example: '게시글 이름' })
  @IsString()
  title: string;

  @ApiProperty({
    example:
      '{"time":1723549214016,"blocks":[{"id":"CWJVRWGV4N","type":"paragraph","data":{"text":"ㅇㄴㄹㄴㅇㄹㅇㄴㅇㄹ"}}],"version":"2.29.1"}',
  })
  @IsString()
  content: string;

  @ApiProperty({ example: 1 })
  @IsNumber()
  boardId: number;
}
