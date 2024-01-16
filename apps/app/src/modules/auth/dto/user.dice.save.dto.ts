// ** Swagger Imports
import { ApiProperty } from '@nestjs/swagger';

// ** Pipe Imports
import { IsString } from 'class-validator';
export default class RequestDiceUserSaveDto {
  @ApiProperty({ example: 'admin' })
  @IsString()
  email: string;

  @ApiProperty({ example: '1234' })
  @IsString()
  password: string;

  @ApiProperty({ example: 'Pinomaker' })
  @IsString()
  nickname: string;

  @ApiProperty({ example: 'd5923f2f-0b78-4583-bb34-5181ee44fa60' })
  @IsString()
  uuid?: string;
}
