// ** Swagger Imports
import { ApiProperty } from '@nestjs/swagger';

// ** Pipe Imports
import { IsEnum, IsString } from 'class-validator';

// ** Dto Imports
import CsCategoryEnum from '../domain/cs-category.enum';

export default class RequestQnaSaveDto {
  @ApiProperty({ example: '이가인' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'admin@admin.co.kr' })
  @IsString()
  email: string;

  @ApiProperty({ example: CsCategoryEnum.BASIC, enum: CsCategoryEnum })
  @IsEnum(CsCategoryEnum)
  category: CsCategoryEnum;

  @ApiProperty({ example: '질문 입니다.' })
  @IsString()
  title: string;

  @ApiProperty({ example: '이렇게 합니다.' })
  @IsString()
  text: string;
}
