// ** Swagger Imports
import { RoleEnum } from '@hi-dice/common';
import { ApiProperty } from '@nestjs/swagger';

// ** Pipe Imports
import { IsEnum, IsNumber } from 'class-validator';

export default class RequestWorkspaceUpdateUpdateDto {
  @ApiProperty({ example: 1 })
  @IsNumber()
  id: number;

  @ApiProperty({ example: RoleEnum.VIEWER, enum: RoleEnum })
  @IsEnum(RoleEnum)
  role: RoleEnum;
}
