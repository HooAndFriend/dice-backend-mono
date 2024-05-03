// ** Swagger Imports
import { ApiProperty } from '@nestjs/swagger';

// ** Pipe Imports
import { IsBoolean, IsNumber, IsString } from 'class-validator';

export default class RequestFaqSaveDto {
  @ApiProperty({ example: '이거는 어떻게 해요?' })
  @IsString()
  question: string;

  @ApiProperty({ example: '이렇게 합니다.' })
  @IsString()
  answer: string;

  @ApiProperty({ example: 1 })
  @IsNumber()
  csCategoryId: number;

  @ApiProperty({ example: 'https://s3.bucket.com/123.pdf' })
  @IsString()
  file: string;

  @ApiProperty({ example: true })
  @IsBoolean()
  isEnabled: boolean;
}
