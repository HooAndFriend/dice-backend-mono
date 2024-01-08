// ** Swagger Imports
import Role from '@/src/common/enum/Role';
import { ApiProperty } from '@nestjs/swagger';

// ** Pipe Imports
import { IsEnum, IsNumber } from 'class-validator';

export default class RequestTeamUserUpdateDto {
  @ApiProperty({ example: 1 })
  @IsNumber()
  teamUserId: number;

  @ApiProperty({ example: Role.VIEWER, enum: Role })
  @IsEnum(Role)
  role: Role;
}
