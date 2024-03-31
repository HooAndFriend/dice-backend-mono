import { IsEnum } from 'class-validator';
import VersionTypeEnum from '../domain/version-type.enum';
import { ApiProperty } from '@nestjs/swagger';

export default class RequestFileDownloadLogSaveDto {
  @ApiProperty({ example: VersionTypeEnum.MAC, enum: VersionTypeEnum })
  @IsEnum(VersionTypeEnum)
  type: VersionTypeEnum;
}
