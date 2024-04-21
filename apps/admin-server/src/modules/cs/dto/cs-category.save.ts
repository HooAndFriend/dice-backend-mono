// ** Swagger Imports
import { ApiProperty } from '@nestjs/swagger';

// ** Pipe Imports
import { IsString } from 'class-validator';

export default class RequestCsCategorySaveDto {
  @ApiProperty({ example: '이거는 어떻게 해요?' })
  @IsString()
  name: string;
}
