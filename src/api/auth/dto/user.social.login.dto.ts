// ** Swagger Imports
import { ApiProperty } from '@nestjs/swagger';

// ** Pipe Imports
import { IsEnum, IsString } from 'class-validator';
import { UserType } from '../../../common/enum/UserType.enum';

export default class RequestSocialUserLoginDto {
  @ApiProperty({ example: '123asdasdpsajdgfkhdasfglajdfh' })
  @IsString()
  token: string;

  @ApiProperty({ example: UserType.APPLE })
  @IsEnum(UserType)
  type: UserType;
}
