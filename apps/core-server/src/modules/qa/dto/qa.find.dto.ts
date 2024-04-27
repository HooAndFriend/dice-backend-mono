// ** Swagger Imports
import { ApiProperty } from '@nestjs/swagger';

// ** Pipe Imports
import { IsEnum, IsOptional, IsString } from 'class-validator';

// ** Enum Imports
import { TaskStatusEnum } from '@repo/common';

export default class RequestQaFindDto {
  @ApiProperty({
    example: TaskStatusEnum.NOTHING,
    enum: TaskStatusEnum,
    required: false,
    type: TaskStatusEnum,
  })
  @IsOptional()
  @IsEnum(TaskStatusEnum)
  status: TaskStatusEnum;

  @ApiProperty({ example: 'QA 제목입니다.', required: false })
  @IsString()
  @IsOptional()
  title: string;

  @ApiProperty({ example: 'Pinomaker', required: false })
  @IsString()
  @IsOptional()
  adminNickname: string;

  @ApiProperty({ example: 'Pinomaker', required: false })
  @IsString()
  @IsOptional()
  workerNickname: string;
}
