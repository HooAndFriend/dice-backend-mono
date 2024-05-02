// ** Swagger Imports
import { RoleEnum } from '@hi-dice/common';
import { ApiProperty } from '@nestjs/swagger';

// ** Pipe Imports
import { IsEnum, IsString } from 'class-validator';

export default class RequestTeamUserSaveDto {
  @ApiProperty({ example: 'inhoo987654321@gmail.com' })
  @IsString()
  email: string;

  @ApiProperty({ example: RoleEnum.VIEWER, enum: RoleEnum })
  @IsEnum(RoleEnum)
  role: RoleEnum;
}
