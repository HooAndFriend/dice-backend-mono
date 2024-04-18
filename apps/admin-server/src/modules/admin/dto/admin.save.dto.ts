// ** Swagger Imports
import { ApiProperty } from '@nestjs/swagger';

// ** Pipe Imports
import { IsEnum, IsString } from 'class-validator';
import AdminRoleEnum from '../domain/admin-role.enum';

export default class RequestAdminSaveDto {
  @ApiProperty({ example: 'subAdmin' })
  @IsString()
  email: string;

  @ApiProperty({ example: '01012345678' })
  @IsString()
  phone: string;

  @ApiProperty({ example: '1234' })
  @IsString()
  password: string;

  @ApiProperty({ example: AdminRoleEnum.MASTER, enum: AdminRoleEnum })
  @IsEnum(AdminRoleEnum)
  role: AdminRoleEnum;

  @ApiProperty({ example: '피노키오' })
  @IsString()
  nickname: string;
}
