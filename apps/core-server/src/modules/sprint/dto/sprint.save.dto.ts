// ** Swagger Imports
import { ApiProperty } from '@nestjs/swagger';
// ** Pipe Imports
import {
  IsArray,
  IsDateString,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
} from 'class-validator';

export default class RequestSprintSaveDto {
  @ApiProperty({ example: '스프린트 이름' })
  @IsString()
  sprintName: string;

  @ApiProperty({ example: '2024-04-04', required: true })
  @Matches(/^\d{4}-\d{2}-\d{2}$/)
  @IsOptional()
  @IsDateString()
  startDate: string;

  @ApiProperty({ example: '2024-04-04', required: true })
  @Matches(/^\d{4}-\d{2}-\d{2}$/)
  @IsOptional()
  @IsDateString()
  endDate: string;

  @ApiProperty({ example: [1, 2, 3] })
  @IsArray()
  ticketIds: number[];
}
