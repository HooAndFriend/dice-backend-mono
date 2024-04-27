// ** Swagger Imports
import { ApiProperty } from '@nestjs/swagger';

// ** Pipe Imports
import { IsEnum, IsNumber, IsString } from 'class-validator';

// ** Enum Imports
import { TaskStatusEnum } from '@repo/common';

export default class RequestQaStatusUpdateDto {
  @ApiProperty({ example: 1 })
  @IsNumber()
  qaId: number;

  @ApiProperty({ example: TaskStatusEnum.COMPLETE, enum: TaskStatusEnum })
  @IsEnum(TaskStatusEnum)
  status: TaskStatusEnum;
}
