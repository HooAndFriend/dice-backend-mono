// ** Swagger Imports
import { ApiProperty } from '@nestjs/swagger';

// ** Pipe Imports
import { IsDate, IsEnum, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

// ** Enum Imports
import { TaskStatusEnum } from '@/src/global/enum/TaskStatus.enum';

export default class RequestQaFindDto {
  @ApiProperty({
    example: TaskStatusEnum.NOTHING,
    enum: TaskStatusEnum,
    default: TaskStatusEnum.NOTHING,
    type: TaskStatusEnum,
  })
  @IsEnum(TaskStatusEnum)
  status: TaskStatusEnum;

  @ApiProperty({ example: '2024-02-02', required: false })
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  createdDate: Date;

  @ApiProperty({ example: '2024-02-24', required: false })
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  modifiedDate: Date;

  @ApiProperty({ example: 'QA 제목입니다.', required: false })
  @IsString()
  @IsOptional()
  title: string;

  @ApiProperty({ example: 'ISSUE-01', required: false })
  @IsString()
  @IsOptional()
  code: string;
}
