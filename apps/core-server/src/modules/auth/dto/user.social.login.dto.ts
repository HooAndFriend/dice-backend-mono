// ** Swagger Imports
import { ApiProperty } from '@nestjs/swagger';

// ** Pipe Imports
import { IsEnum, IsString } from 'class-validator';
import { UserType } from '../../../global/enum/UserType.enum';

export default class RequestSocialUserLoginDto {
  @ApiProperty({ example: 'op973GfpO2U13FbxPed1E5AcgHd2' })
  @IsString()
  token: string;

  @ApiProperty({ example: 'op973GfpO2U13FbxPed1E5AcgHd2' })
  @IsString()
  fcmToken: string;

  @ApiProperty({ example: UserType.GOOGLE, enum: UserType })
  @IsEnum(UserType)
  type: UserType;
}
