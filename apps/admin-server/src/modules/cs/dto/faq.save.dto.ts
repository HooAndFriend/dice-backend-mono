// ** Swagger Imports
import { ApiProperty } from '@nestjs/swagger';

// ** Pipe Imports
import { IsEnum, IsString } from 'class-validator';
import CsCategoryEnum from '../domain/cs-category.enum';

export default class RequestFaqSaveDto {
  @ApiProperty({ example: '이거는 어떻게 해요?' })
  @IsString()
  question: string;

  @ApiProperty({ example: '이렇게 합니다.' })
  @IsString()
  answer: string;

  @ApiProperty({ example: CsCategoryEnum.BASIC, enum: CsCategoryEnum })
  @IsEnum(CsCategoryEnum)
  category: CsCategoryEnum;
}
