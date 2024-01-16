// ** Swagger Imports
import Role from '@/src/global/enum/Role';
import { ApiProperty } from '@nestjs/swagger';

// ** Pipe Imports
import { IsEnum, IsNumber } from 'class-validator';

export default class RequestWorkspaceUpdateUpdateDto {
  @ApiProperty({ example: 1 })
  @IsNumber()
  id: number;

  @ApiProperty({ example: Role.VIEWER, enum: Role })
  @IsEnum(Role)
  role: Role;
}
