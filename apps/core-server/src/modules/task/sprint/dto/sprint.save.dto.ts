// ** Swagger Imports
import { ApiProperty } from '@nestjs/swagger';

// ** Enum Imports
import { SprintStatusEnum } from '@hi-dice/common';

// ** Pipe Imports
import {
  IsDateString,
  IsEnum,
  IsOptional,
  IsString,
  Matches,
} from 'class-validator';

export default class RequestSprintSaveDto {
  @ApiProperty({ example: '스프린트 이름' })
  @IsString()
  title: string;

  @ApiProperty({ example: '2024-08-08', required: true })
  @Matches(/^\d{4}-\d{2}-\d{2}$/)
  @IsOptional()
  @IsDateString()
  startDate: string;

  @ApiProperty({ example: '2024-08-08', required: true })
  @Matches(/^\d{4}-\d{2}-\d{2}$/)
  @IsOptional()
  @IsDateString()
  endDate: string;

  @ApiProperty({ example: '스프린트 설명' })
  @IsString()
  @IsOptional()
  description: string;

  @ApiProperty({ example: SprintStatusEnum.DOING, enum: SprintStatusEnum })
  @IsEnum(SprintStatusEnum)
  @IsOptional()
  status: SprintStatusEnum;
}
