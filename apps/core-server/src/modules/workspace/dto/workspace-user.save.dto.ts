// ** Swagger Imports
import { RoleEnum } from '@hi-dice/common';
import { ApiProperty } from '@nestjs/swagger';

// ** Pipe Imports
import { IsArray, IsEnum, IsNumber } from 'class-validator';

export default class RequestWorkspaceUserSaveDto {
  @ApiProperty({ example: [1, 2, 3] })
  @IsArray()
  teamUserId: number[];

  @ApiProperty({ example: RoleEnum.VIEWER, enum: RoleEnum })
  @IsEnum(RoleEnum)
  role: RoleEnum;
}
