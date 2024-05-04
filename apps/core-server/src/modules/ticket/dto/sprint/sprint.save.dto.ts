// ** Swagger Imports
import { ApiProperty } from '@nestjs/swagger';
// ** Pipe Imports
import { IsString } from 'class-validator';

export default class RequestSprintSaveByNameDto {
  @ApiProperty({ example: '스프린트 이름' })
  @IsString()
  sprintName: string;
}
