// ** Swagger Imports
import { ApiProperty } from '@nestjs/swagger';

// ** Pipe Imports
import { IsEnum, IsNumber } from 'class-validator';

// ** Enum Imports
import { TaskStatusEnum } from '@hi-dice/common';

export default class RequestTicketStatusUpdateDto {
  @ApiProperty({ example: 2 })
  @IsNumber()
  ticketId: number;

  @ApiProperty({ example: TaskStatusEnum.DONE, enum: TaskStatusEnum })
  @IsEnum(TaskStatusEnum)
  status: TaskStatusEnum;
}
