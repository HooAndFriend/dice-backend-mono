// ** Swagger Imports
import DiceFunction from '@/src/global/enum/DiceFunction';
import { ApiProperty } from '@nestjs/swagger';

// ** Pipe Imports
import { IsEnum, IsNumber } from 'class-validator';

export default class RequestSaveWorkspaceFunctionDto {
  @ApiProperty({ example: DiceFunction.TICKET, enum: DiceFunction })
  @IsEnum(DiceFunction)
  function: DiceFunction;
}
