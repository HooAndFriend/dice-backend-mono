// ** Swagger Imports
import Role from '@/src/common/enum/Role';
import { ApiProperty } from '@nestjs/swagger';

// ** Pipe Imports
import { IsEnum, IsString } from 'class-validator';

export default class RequestTeamUserSaveDto {
  @ApiProperty({ example: 1 })
  @IsString()
  teamId: number;

  @ApiProperty({ example: 'inhoo987654321@gmail.com' })
  @IsString()
  email: string;

  @ApiProperty({ example: Role.VIEWER, enum: Role })
  @IsEnum(Role)
  role: Role;
}
