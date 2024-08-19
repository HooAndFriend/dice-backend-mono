// ** Swagger Imports
import { ApiProperty } from '@nestjs/swagger';

// ** Pipe Imports
import { IsString } from 'class-validator';

export default class RequestAdminReissueDto {
  @ApiProperty({ example: '123asdasdpsajdgfkhdasfglajdfh' })
  @IsString()
  refreshToken: string;
}
