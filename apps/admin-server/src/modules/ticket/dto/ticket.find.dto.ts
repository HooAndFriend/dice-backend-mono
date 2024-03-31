// ** Swagger Imports
import { ApiProperty } from '@nestjs/swagger';

// ** Pipe Imports
import {
  IsDate,
  IsDateString,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { QaStatus } from '@/src/global/enum/QaStatus.enum';
import { Type } from 'class-transformer';
export default class RequestTicketFindDto {
  @ApiProperty({ example: '2024-02-02', required: false })
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  dueDate: Date;

  @ApiProperty({ example: '2024-02-24', required: false })
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  completeDate: Date;

  @ApiProperty({ example: 'Ticket 내용입니다', required: false })
  @IsString()
  @IsOptional()
  content: string;
}
