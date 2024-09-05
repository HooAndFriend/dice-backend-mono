// ** Swagger Imports
import { ApiProperty } from '@nestjs/swagger';

// ** Pipe Imports
import { IsNumber, IsString } from 'class-validator';

export default class RequestCsCategoryUpdateDto {
  @ApiProperty({ example: 1 })
  @IsNumber()
  csCategoryId: number;

  @ApiProperty({ example: '전체' })
  @IsString()
  name: string;
}
