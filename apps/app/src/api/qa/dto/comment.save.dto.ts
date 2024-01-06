// ** Swagger Imports
import { ApiProperty } from '@nestjs/swagger';

// ** Pipe Imports
import { IsNumber, IsString } from 'class-validator';
export default class RequestCommentSaveDto {
  @ApiProperty({ example: 'QA 댓글 내용입니다' })
  @IsString()
  content: string;

  @ApiProperty({ example: 101})
  @IsNumber()
  userId: number;

  @ApiProperty({ example: 10001})
  @IsNumber()
  qaId: number;
}
