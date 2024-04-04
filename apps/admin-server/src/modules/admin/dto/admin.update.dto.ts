// ** Swagger Imports
import { ApiProperty } from '@nestjs/swagger';

// ** Pipe Imports
import { IsEnum, IsNumber, IsString } from 'class-validator';
import AdminRoleEnum from '../domain/admin-role.enum';

export default class RequestAdminUpdateDto {
  @ApiProperty({ example: 1 })
  @IsNumber()
  adminId: number;

  @ApiProperty({ example: AdminRoleEnum.MASTER, enum: AdminRoleEnum })
  @IsEnum(AdminRoleEnum)
  role: AdminRoleEnum;

  @ApiProperty({ example: '피노키오' })
  @IsString()
  nickname: string;

  @ApiProperty({ example: '01012345678' })
  @IsString()
  phone: string;

  @ApiProperty({ example: 'https://s3.bucket.com/123.png' })
  @IsString()
  profile: string;
}
