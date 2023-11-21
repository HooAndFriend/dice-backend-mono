// ** Swagger Imports
import { ApiProperty } from '@nestjs/swagger';

// ** Pipe Imports
import { IsEnum, IsString } from 'class-validator';
import { ApiType } from '../../../common/enum/ApiType.enum';

export default class RequestApiSaveDto {
  @ApiProperty({ example: 'New Request' })
  @IsString()
  name: string;

  @ApiProperty({ example: ApiType.POST, type: 'enum', enum: ApiType})
  @IsEnum(ApiType)
  type: ApiType;

  @ApiProperty({ example: 'localhost:8080/api/...'})
  @IsString()
  endpoint: string;
}
