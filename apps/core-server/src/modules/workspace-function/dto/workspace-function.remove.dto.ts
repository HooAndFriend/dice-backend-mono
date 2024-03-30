// ** Swagger Imports
import DiceFunction from '@/src/global/enum/DiceFunction';
import { ApiProperty } from '@nestjs/swagger';

// ** Pipe Imports
import { IsEnum } from 'class-validator';

export default class RequestRemoveWorkspaceFunctionDto {
  @ApiProperty({ example: DiceFunction.TICKET, enum: DiceFunction })
  @IsEnum(DiceFunction)
  function: DiceFunction;
}
