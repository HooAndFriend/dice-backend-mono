// ** Swagger Imports
import { ApiProperty } from '@nestjs/swagger';

// ** Pipe Imports
import { IsNumber } from 'class-validator';

export default class RequestEpicOrderUpdateDto {
  @ApiProperty({ example: 2 })
  @IsNumber()
  epicId: number;

  @ApiProperty({ example: 2 })
  @IsNumber()
  targetEpicId: number;
}
