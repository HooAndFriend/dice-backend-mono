// ** Swagger Imports
import { ApiProperty } from '@nestjs/swagger';

// ** Pipe Imports
import { IsString } from 'class-validator';

export default class RequestTableSaveDto {
  @ApiProperty({ example: 'tbl_test' })
  @IsString()
  name: string;

  @ApiProperty({ example: '예시 테이블' })
  @IsString()
  comment: string;
}
