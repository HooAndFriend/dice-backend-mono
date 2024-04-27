// ** Swagger Imports
import { RoleEnum } from '@repo/common';
import { ApiProperty } from '@nestjs/swagger';

// ** Pipe Imports
import { IsEnum, IsNumber } from 'class-validator';

export default class RequestTeamUserUpdateDto {
  @ApiProperty({ example: 1 })
  @IsNumber()
  teamUserId: number;

  @ApiProperty({ example: RoleEnum.VIEWER, enum: RoleEnum })
  @IsEnum(RoleEnum)
  role: RoleEnum;
}
