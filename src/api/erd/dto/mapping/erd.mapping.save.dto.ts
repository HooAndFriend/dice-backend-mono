import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export default class RequestMappingSaveDto {
  @ApiProperty({ example: 2 })
  @IsNumber()
  tableParentId: number;

  @ApiProperty({ example: 1 })
  @IsNumber()
  tableChildId: number;

  @ApiProperty({ example: 2 })
  @IsNumber()
  ColumnId: number;
}
