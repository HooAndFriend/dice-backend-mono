// ** Swagger Imports
import { ApiProperty } from '@nestjs/swagger';

// ** Pipe Imports
import { IsNumber, IsString } from 'class-validator';

export default class RequestCommentUpdateDto {
  @ApiProperty({ example: 2 })
  @IsNumber()
  commentId: number;

  @ApiProperty({ example: '수정된 댓글입니다.' })
  @IsString()
  content: string;
}
