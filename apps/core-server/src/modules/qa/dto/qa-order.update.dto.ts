// ** Swagger Imports
import { ApiProperty } from '@nestjs/swagger';

// ** Pipe Imports
import { IsNumber } from 'class-validator';

export default class RequestQaOrderUpdateDto {
  @ApiProperty({ example: 2 })
  @IsNumber()
  qaId: number;

  @ApiProperty({ example: 2 })
  @IsNumber()
  targetQaId: number;
}
