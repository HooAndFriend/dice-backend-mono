// ** Swagger Imports
import { DiceFunction } from '@repo/common';
import { ApiProperty } from '@nestjs/swagger';

// ** Pipe Imports
import { IsEnum } from 'class-validator';

export default class RequestSaveWorkspaceFunctionDto {
  @ApiProperty({ example: DiceFunction.TICKET, enum: DiceFunction })
  @IsEnum(DiceFunction)
  function: DiceFunction;
}
