// ** Swagger Imports
import { ApiProperty } from '@nestjs/swagger';

// ** Pipe Imports
import { IsBoolean, IsEnum, IsNumber, IsString } from 'class-validator';
import CsCategoryEnum from '../domain/cs-category.enum';

export default class RequestFaqUpdateDto {
  @ApiProperty({ example: 1 })
  @IsNumber()
  faqId: number;

  @ApiProperty({ example: '이거는 어떻게 해요?' })
  @IsString()
  question: string;

  @ApiProperty({ example: '이렇게 합니다.' })
  @IsString()
  answer: string;

  @ApiProperty({ example: 'https://s3.bucket.com/123.pdf' })
  @IsString()
  file: string;

  @ApiProperty({ example: true })
  @IsBoolean()
  isEnabled: boolean;

  @ApiProperty({ example: CsCategoryEnum.BASIC, enum: CsCategoryEnum })
  @IsEnum(CsCategoryEnum)
  category: CsCategoryEnum;
}
