// ** Swagger Imports
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

// ** Pipe Imports
import { IsArray, IsDate, IsNumber, IsOptional, IsString, Matches } from 'class-validator';
export default class RequestQaSaveDto {
  @ApiProperty({ example: 1 })
  @IsNumber()
  workerId: number;

  @ApiProperty({ example: 'ISSUE-01' })
  @IsString()
  number: string;

  @ApiProperty({ example: 'QA 제목입니다.' })
  @IsString()
  title: string;

  @ApiProperty({ example: '문제사항입니다.' })
  @IsString()
  asIs: string;

  @ApiProperty({ example: '기대결과입니다.' })
  @IsString()
  toBe: string;

  @ApiProperty({ example: '메모입니다' })
  @IsString()
  memo: string;

  @ApiProperty({ example : '2024-04-04', required : false})
  @Matches(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/)
  @IsString()
  dueDate : string;

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
