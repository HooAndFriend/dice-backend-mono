// ** Swagger Imports
import { ApiProperty } from '@nestjs/swagger';

// ** Pipe Imports
import { IsOptional, IsString } from 'class-validator';
export default class RequestDiceUserLoginDto {
  @ApiProperty({ example: 'admin' })
  @IsString()
  email: string;

  @ApiProperty({ example: '1234' })
  @IsString()
  password: string;

  @ApiProperty({ example: 'op973GfpO2U13FbxPed1E5AcgHd2' })
  @IsOptional()
  @IsString()
  fcmToken?: string;
}
