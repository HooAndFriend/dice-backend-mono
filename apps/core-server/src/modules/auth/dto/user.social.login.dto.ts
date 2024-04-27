// ** Swagger Imports
import { ApiProperty } from '@nestjs/swagger';

// ** Pipe Imports
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { UserType } from '@repo/common';

export default class RequestSocialUserLoginDto {
  @ApiProperty({ example: 'op973GfpO2U13FbxPed1E5AcgHd2' })
  @IsString()
  token: string;

  @ApiProperty({ example: 'op973GfpO2U13FbxPed1E5AcgHd2' })
  @IsOptional()
  @IsString()
  fcmToken?: string;

  @ApiProperty({ example: UserType.GOOGLE, enum: UserType })
  @IsEnum(UserType)
  type: UserType;
}
