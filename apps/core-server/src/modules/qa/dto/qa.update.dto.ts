// ** Swagger Imports
import { ApiProperty } from '@nestjs/swagger';

// ** Pipe Imports
import { IsArray, IsNumber, IsString } from 'class-validator';
export default class RequestQaUpdateDto {
  @ApiProperty({ example: 1 })
  @IsNumber()
  qaId: number;

  @ApiProperty({ example: 2 })
  @IsNumber()
  workerId: number;

  @ApiProperty({ example: '수정된 QA 제목입니다.' })
  @IsString()
  title: string;

  @ApiProperty({ example: '수정된 문제사항입니다.' })
  @IsString()
  asIs: string;

  @ApiProperty({ example: '수정된 기대결과입니다.' })
  @IsString()
  toBe: string;

  @ApiProperty({ example: '수정된 메모입니다' })
  @IsString()
  memo: string;

  @ApiProperty({
    type: [Object],
    example: [
      {
        url: 'https://health.chosun.com/site/data/img_dir/2023/07/17/2023071701753_0.jpg',
      },
    ],
  })
  @IsArray()
  fileurls: { url: string }[];
}
