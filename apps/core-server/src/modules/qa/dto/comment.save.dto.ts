// ** Swagger Imports
import { ApiProperty } from '@nestjs/swagger';

// ** Pipe Imports
import { IsNumber, IsString } from 'class-validator';
export default class RequestQaCommentSaveDto {
  @ApiProperty({ example: 'QA 댓글 내용입니다' })
  @IsString()
  content: string;

  @ApiProperty({ example: 1})
  @IsNumber()
  userId: number;

  @ApiProperty({ example: 1})
  @IsNumber()
  qaId: number;
}
