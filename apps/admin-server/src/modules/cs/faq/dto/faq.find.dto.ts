// ** Swagger Imports
import { ApiProperty } from '@nestjs/swagger';

// ** Pipe Imports
import {
  IsArray,
  IsBoolean,
  IsDateString,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
} from 'class-validator';

// ** Dto Imports
import { RequestPagingDto } from '@hi-dice/common';
import { Type } from 'class-transformer';

export default class RequestFaqFindDto extends RequestPagingDto {
  @ApiProperty({ example: 2, required: false })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  csCategoryId: number;

  @ApiProperty({ example: '이거는 어떻게 해요?', required: false })
  @IsOptional()
  @IsString()
  question: string;

  @ApiProperty({ example: true, required: false })
  @IsOptional()
  @IsBoolean()
  isExpose: boolean;

  @ApiProperty({ example: '이가인', required: false })
  @IsOptional()
  @IsString()
  admin: string;

  @ApiProperty({ example: '2023-12-23', required: false })
  @IsDateString()
  @IsOptional()
  @Matches(/^\d{4}-\d{2}-\d{2}$/)
  startDate: string;

  @ApiProperty({ example: '2025-01-01', required: false })
  @IsDateString()
  @IsOptional()
  @Matches(/^\d{4}-\d{2}-\d{2}$/)
  endDate: string;
}
