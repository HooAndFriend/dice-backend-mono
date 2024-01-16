// ** Swagger Imports
import Role from '@/src/global/enum/Role';
import { ApiProperty } from '@nestjs/swagger';

// ** Pipe Imports
import { IsArray, IsEnum, IsNumber } from 'class-validator';

export default class RequestWorkspaceUserSaveDto {
  @ApiProperty({ example: 1 })
  @IsNumber()
  workspaceId: number;

  @ApiProperty({ example: [1, 2, 3] })
  @IsArray()
  teamUserId: number[];

  @ApiProperty({ example: Role.VIEWER, enum: Role })
  @IsEnum(Role)
  role: Role;
}
