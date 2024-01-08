// ** Swagger Imports
import Role from '@/src/common/enum/Role';
import { ApiProperty } from '@nestjs/swagger';

// ** Pipe Imports
import { IsEnum, IsString } from 'class-validator';

export default class RequestTeamUserUpdateDto {
  @ApiProperty({ example: 1 })
  @IsString()
  teamUserId: number;

  @ApiProperty({ example: Role.VIEWER, enum: Role })
  @IsEnum(Role)
  role: Role;
}
