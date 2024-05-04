// ** Swagger Imports
import { ApiProperty } from '@nestjs/swagger';

// ** Pipe Imports
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { UserType } from '@hi-dice/common';

export default class RequestSocialUserSaveDto {
  @ApiProperty({ example: 'op973GfpO2U13FbxPed1E5AcgHd2' })
  @IsString()
  token: string;

  @ApiProperty({ example: 'inhoo23@naver.com' })
  @IsString()
  email: string;

  @ApiProperty({ example: 'Pinomaker' })
  @IsString()
  nickname: string;

  @ApiProperty({ example: UserType.GOOGLE, enum: UserType })
  @IsEnum(UserType)
  type: UserType;

  @ApiProperty({ example: 'op973GfpO2U13FbxPed1E5AcgHd2' })
  @IsOptional()
  @IsString()
  fcmToken?: string;

  @ApiProperty({ example: 'd5923f2f-0b78-4583-bb34-5181ee44fa60' })
  @IsOptional()
  @IsString()
  uuid?: string;
}
