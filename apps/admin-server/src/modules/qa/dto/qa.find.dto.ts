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
  Matches,
} from 'class-validator';
import { Type } from 'class-transformer';

// ** Enum Imports
import { TaskStatusEnum } from '@hi-dice/common';

export default class RequestQaFindDto {
  @ApiProperty({ example: 1 })
  @Type(() => Number)
  @IsNumber()
  workspaceId: number;

  @ApiProperty({
    example: TaskStatusEnum.NOTHING,
    enum: TaskStatusEnum,
    type: TaskStatusEnum,
    required: false,
  })
  @IsOptional()
  @IsEnum(TaskStatusEnum)
  status: TaskStatusEnum;

  @ApiProperty({ example: '2024-02-02', required: false })
  @IsOptional()
  @Matches(/^\d{4}-\d{2}-\d{2}$/)
  @IsDateString()
  createdDate: Date;

  @ApiProperty({ example: '2024-02-24', required: false })
  @IsOptional()
  @Matches(/^\d{4}-\d{2}-\d{2}$/)
  @IsDateString()
  modifiedDate: Date;

  @ApiProperty({ example: 'QA 제목입니다.', required: false })
  @IsOptional()
  @IsString()
  title: string;

  @ApiProperty({ example: 'ISSUE-01', required: false })
  @IsOptional()
  @IsString()
  code: string;
}
