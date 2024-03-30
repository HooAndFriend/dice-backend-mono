// ** Swagger Imports
import { ApiProperty } from '@nestjs/swagger';

// ** Pipe Imports
import { IsNumber, IsString } from 'class-validator';

export default class RequestQaUserUpdateDto {
  @ApiProperty({ example: 1 })
  @IsNumber()
  qaId: number;

  @ApiProperty({ example: 1 })
  @IsNumber()
  userId: number;

  @ApiProperty({ example: 'user' })
  @IsString()
  type: 'user' | 'admin';
}
