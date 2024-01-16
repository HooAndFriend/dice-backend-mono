// ** Swagger Imports
import { ApiProperty } from '@nestjs/swagger';

// ** Pipe Imports
import { IsEnum, IsString } from 'class-validator';
import { UserType } from '../../../global/enum/UserType.enum';

export default class RequestSocialUserSaveDto {
  @ApiProperty({ example: '123asdasdpsajdgfkhdasfglajdfh' })
  @IsString()
  token: string;

  @ApiProperty({ example: 'inhoo23@naver.com' })
  @IsString()
  email: string;

  @ApiProperty({ example: 'Pinomaker' })
  @IsString()
  nickname: string;

  @ApiProperty({ example: UserType.APPLE, enum: UserType })
  @IsEnum(UserType)
  type: UserType;

  @ApiProperty({ example: 'd5923f2f-0b78-4583-bb34-5181ee44fa60' })
  @IsString()
  uuid?: string;
}
