// ** Swagger Imports
import { ApiProperty } from '@nestjs/swagger';

// ** Pipe Imports
import { IsEnum, IsNumber, IsString } from 'class-validator';

// ** Enum Imports
import VersionTypeEnum from '../domain/version-type.enum';

export default class RequestVersionUpdateDto {
  @ApiProperty({ example: 1 })
  @IsNumber()
  versionId: number;

  @ApiProperty({ example: '1.0.5' })
  @IsString()
  version: string;

  @ApiProperty({ example: 'https://s3.bucket.com/123.pdf' })
  @IsString()
  program: string;

  @ApiProperty({ example: '메모할 것' })
  @IsString()
  memo: string;

  @ApiProperty({ example: VersionTypeEnum.MAC, enum: VersionTypeEnum })
  @IsEnum(VersionTypeEnum)
  type: VersionTypeEnum;
}
