// ** Swagger Imports
import Role from '@/src/common/enum/Role';
import { ApiProperty } from '@nestjs/swagger';

// ** Pipe Imports
import { IsEnum, IsNumber, IsString } from 'class-validator';

export default class RequestTeamUserSaveDto {
  @ApiProperty({ example: 1 })
  @IsNumber()
  teamId: number;

  @ApiProperty({ example: 'inhoo987654321@gmail.com' })
  @IsString()
  email: string;

  @ApiProperty({ example: Role.VIEWER, enum: Role })
  @IsEnum(Role)
  role: Role;
}
