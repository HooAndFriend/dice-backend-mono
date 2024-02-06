// ** Swagger Imports
import { ApiProperty } from '@nestjs/swagger';

// ** Pipe Imports
import { IsEnum, IsOptional, IsString } from 'class-validator';
import AdminRoleEnum from '../domain/admin-role.enum';
import RequestPagingDto from '@/src/global/dto/paging.dto';

export default class RequestAdminFindDto extends RequestPagingDto {
  @ApiProperty({ example: 'subAdmin', required: false })
  @IsOptional()
  @IsString()
  email: string;

  @ApiProperty({
    example: AdminRoleEnum.MASTER,
    enum: AdminRoleEnum,
    required: false,
  })
  @IsOptional()
  @IsEnum(AdminRoleEnum)
  role: AdminRoleEnum;

  @ApiProperty({ example: '피노키오', required: false })
  @IsOptional()
  @IsString()
  nickname: string;
}
