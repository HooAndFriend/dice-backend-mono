// ** Swagger Imports
import { ApiProperty } from '@nestjs/swagger';

// ** Pipe Imports
import { IsArray, IsEnum } from 'class-validator';

// ** Enum Imports
import { TaskStatusEnum } from '@hi-dice/common';

export default class RequestMultiTicketStatusUpdateDto {
  @ApiProperty({ example: [2] })
  @IsArray()
  ticketIds: number[];

  @ApiProperty({ example: TaskStatusEnum.DOING, enum: TaskStatusEnum })
  @IsEnum(TaskStatusEnum)
  status: TaskStatusEnum;
}
