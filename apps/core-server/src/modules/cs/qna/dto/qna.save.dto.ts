// ** Swagger Imports
import { ApiProperty } from '@nestjs/swagger';

// ** Pipe Imports
import { IsNumber, IsString } from 'class-validator';

export default class RequestQnaSaveDto {
  @ApiProperty({ example: '이가인' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'admin@admin.co.kr' })
  @IsString()
  email: string;

  @ApiProperty({ example: 1 })
  @IsNumber()
  categoryId: number;

  @ApiProperty({ example: '질문 입니다.' })
  @IsString()
  title: string;

  @ApiProperty({ example: '이렇게 합니다.' })
  @IsString()
  text: string;
}
