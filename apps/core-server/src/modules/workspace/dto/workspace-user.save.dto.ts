// ** Swagger Imports
import { RoleEnum } from '@hi-dice/common';
import { ApiProperty } from '@nestjs/swagger';

// ** Pipe Imports
import { IsEnum, IsString } from 'class-validator';

export default class RequestWorkspaceUserSaveDto {
  @ApiProperty({ example: 'admin@admin.com' })
  @IsString()
  email: string;

  @ApiProperty({ example: RoleEnum.VIEWER, enum: RoleEnum })
  @IsEnum(RoleEnum)
  role: RoleEnum;
}
