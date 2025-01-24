// ** Swagger Imports
import { ApiProperty } from '@nestjs/swagger';

// ** Pipe Imports
import { IsArray } from 'class-validator';

export default class RequestLabelUpdateDto {
  @ApiProperty({
    example: [
      {
        labelId: 1,
        name: '123',
        bgColor: '#fff',
        color: 'black',
        description: '123',
      },
    ],
  })
  @IsArray()
  data: LabelUpdate[];
}

export interface LabelUpdate {
  labelId: number;
  name: string;
  description: string;
  bgColor: string;
  color: string;
}
