// ** Swagger Imports
import { ApiProperty } from '@nestjs/swagger';

// ** Pipe Imports
import { IsEnum, IsString } from 'class-validator';
import { UserType } from '../../../common/enum/UserType.enum';

export default class RequestSocialUserSaveDto {
  @ApiProperty({ example: '123asdasdpsajdgfkhdasfglajdfh' })
  @IsString()
  token: string;

  @ApiProperty({ example: 'Pinomaker' })
  @IsString()
  nickname: string;

  @ApiProperty({ example: UserType.APPLE, enum: UserType })
  @IsEnum(UserType)
  type: UserType;
}
