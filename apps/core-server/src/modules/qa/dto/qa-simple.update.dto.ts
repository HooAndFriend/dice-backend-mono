// ** Swagger Imports
import { ApiProperty } from '@nestjs/swagger';

// ** Pipe Imports
import { IsNumber, IsString } from 'class-validator';

export default class RequestQaSimpleUpdateDto {
  @ApiProperty({ example: 1 })
  @IsNumber()
  qaId: number;

  @ApiProperty({ example: 'title' })
  @IsString()
  type: 'title' | 'asIs' | 'toBe' | 'memo';

  @ApiProperty({ example: '수정된 문제사항입니다.' })
  @IsString()
  value: string;
}
