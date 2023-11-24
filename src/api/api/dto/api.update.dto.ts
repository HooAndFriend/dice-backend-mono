// ** Swagger Imports
import { ApiProperty } from '@nestjs/swagger';

// ** Pipe Imports
import { IsEnum, IsNumber, IsString } from 'class-validator';
import { ApiType } from '../../../common/enum/ApiType.enum';
import { AuthorizationType } from '../../../common/enum/AuthorizationType.enum';
import { BodyType } from '../../../common/enum/BodyType.enum';

export default class RequestApiUpdateDto {
  @ApiProperty({ example: 1 })
  @IsNumber()
  id: number;

  @ApiProperty({ example: 'New Request' })
  @IsString()
  name: string;

  @ApiProperty({ example: ApiType.POST, enum: ApiType })
  @IsEnum(ApiType)
  apitype: ApiType;

  @ApiProperty({ example: 'localhost:8080/api/...' })
  @IsString()
  endpoint: string;

  @ApiProperty({
    example: AuthorizationType.NoAuth,
    type: 'enum',
    enum: AuthorizationType,
  })
  @IsEnum(AuthorizationType)
  authtype: AuthorizationType;

  @ApiProperty({ example: 'headerkey' })
  @IsString()
  headerkey: string;

  @ApiProperty({ example: 'headervalue' })
  @IsString()
  headervalue: string;

  @ApiProperty({ example: 'headerdiscreption' })
  headerdiscreption: Text;

  @ApiProperty({ example: BodyType.NONE, type: 'enum', enum: BodyType })
  @IsEnum(BodyType)
  bodytype: BodyType;

  @ApiProperty({ example: '{ "name": "New Collection" }' })
  @IsString()
  rawdata: string;

  @ApiProperty({ example: 'name' })
  @IsString()
  formdatakey: string;

  @ApiProperty({ example: 'New Collection' })
  @IsString()
  formdatavalue: string;
}
