// ** Swagger Imports
import { ApiProperty } from '@nestjs/swagger';

// ** Pipe Imports
import { IsEnum, IsString } from 'class-validator';
import { UserType } from '../../../global/enum/UserType.enum';

export default class RequestSocialUserLoginDto {
  @ApiProperty({ example: '123asdasdpsajdgfkhdasfglajdfh' })
  @IsString()
  token: string;

  @ApiProperty({ example: UserType.APPLE, enum: UserType })
  @IsEnum(UserType)
  type: UserType;
}
