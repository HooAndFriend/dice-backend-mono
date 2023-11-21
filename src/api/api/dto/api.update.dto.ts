// ** Swagger Imports
import { ApiProperty } from '@nestjs/swagger';

// ** Pipe Imports
import { IsEnum, IsNumber, IsString } from 'class-validator';
import { ApiType } from '../../../common/enum/ApiType.enum';

export default class RequestApiUpdateDto {
  @ApiProperty({ example: 1 })
  @IsNumber()
  id: number;

  @ApiProperty({ example: 'New Request' })
  @IsString()
  name: string;

  @ApiProperty({ example: ApiType.POST, enum: ApiType })
  @IsEnum(ApiType)
  type: ApiType;

  @ApiProperty({ example: 'localhost:8080/api/...' })
  @IsString()
  endpoint: string;
}
