// ** Swagger Imports
import { ApiProperty } from '@nestjs/swagger';

// ** Enum Imports
import { SprintStatusEnum } from '../enum/sprint.enum';

// ** Pipe Imports
import {
  IsDateString,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
} from 'class-validator';

export default class RequestSprintSaveDto {
  @ApiProperty({ example: '스프린트 이름' })
  @IsString()
  title: string;

  @ApiProperty({ example: '2024-08-08', required: false })
  @Matches(/^\d{4}-\d{2}-\d{2}$/)
  @IsOptional()
  @IsDateString()
  startDate: string;

  @ApiProperty({ example: '2024-08-08', required: false })
  @Matches(/^\d{4}-\d{2}-\d{2}$/)
  @IsOptional()
  @IsDateString()
  endDate: string;

  @ApiProperty({ example: '스프린트 설명', required: false })
  @IsString()
  @IsOptional()
  description: string;

  @ApiProperty({ example: SprintStatusEnum.DOING, enum: SprintStatusEnum })
  @IsEnum(SprintStatusEnum)
  @IsOptional()
  status: SprintStatusEnum;

  @ApiProperty({ example: 1 })
  @IsNumber()
  orderId: number;
}
