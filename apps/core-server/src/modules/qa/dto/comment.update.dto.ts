// ** Swagger Imports
import { ApiProperty } from '@nestjs/swagger';

// ** Pipe Imports
import { IsNumber, IsString } from 'class-validator';
export default class RequestQaCommentUpdateDto {
  @ApiProperty({ example: '수정된 QA 댓글 내용입니다' })
  @IsString()
  content: string;

  @ApiProperty({ example: 1 })
  @IsNumber()
  commentId: number;
}
