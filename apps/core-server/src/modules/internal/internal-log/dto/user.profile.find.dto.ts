// ** Swagger Imports
import { ApiProperty } from '@nestjs/swagger';

// ** Pipe Imports
import { IsArray } from 'class-validator';

export default class RequestUserProfileFindDto {
  @ApiProperty({ example: ['피노피노얍'] })
  @IsArray()
  email: string[];
}
