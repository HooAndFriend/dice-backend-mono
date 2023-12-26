// ** Swagger Imports
import { ApiProperty } from '@nestjs/swagger';

// ** Pipe Imports
import { IsNumber, IsString } from 'class-validator';

export default class RequestTableUpdateDto {
  @ApiProperty({ example: 1 })
  @IsNumber()
  tableId: number;

  @ApiProperty({ example: 'tbl_test' })
  @IsString()
  physicalName: string;

  @ApiProperty({ example: 'tbl_test' })
  @IsString()
  logicalName: string;

  @ApiProperty({ example: '예시 테이블' })
  @IsString()
  comment: string;
}