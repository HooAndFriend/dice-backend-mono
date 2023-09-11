// ** Swagger Imports
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

// ** Pipe Imports
import { IsNumber, IsOptional } from 'class-validator';

export default class RequestPagingDto {
  @ApiProperty({ example: 0, required: false })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  page: number = 1;

  @ApiProperty({ example: 10, required: false })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  pageSize: number = 10;

  get offset(): number {
    return (this.page - 1) * this.pageSize;
  }
}
