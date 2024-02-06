// ** Swagger Imports
import { ApiProperty } from '@nestjs/swagger';

// ** Pipe Imports
import { IsNumber, IsString } from 'class-validator';

export default class RequestQnaAnswerDto {
  @ApiProperty({ example: 1 })
  @IsNumber()
  qnaId: number;

  @ApiProperty({ example: 'https://s3.bucket.com/123.pdf' })
  @IsString()
  file: string;

  @ApiProperty({ example: '이렇게 합니다.' })
  @IsString()
  answer: string;
}
