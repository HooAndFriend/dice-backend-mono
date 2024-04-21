// ** Swagger Imports
import { ApiProperty } from '@nestjs/swagger';

// ** Pipe Imports
import {
  IsBoolean,
  IsDateString,
  IsOptional,
  IsString,
  Matches,
} from 'class-validator';

// ** Dto Imports
import RequestPagingDto from '@/src/global/dto/paging.dto';

export default class RequestQnaFindDto extends RequestPagingDto {
  @ApiProperty({ example: '이거는 어떻게 해요?', required: false })
  @IsOptional()
  @IsString()
  question: string;

  @ApiProperty({ example: true, required: false })
  @IsOptional()
  @IsBoolean()
  isAnswer: boolean;

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
