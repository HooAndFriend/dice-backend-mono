// ** Swagger Imports
import { ApiProperty } from '@nestjs/swagger';

// ** Pipe Imports
import { IsEnum, IsNumber, IsString } from 'class-validator';
import { ApiType } from '../../../common/enum/ApiType.enum';
import { AuthorizationType } from '../../../common/enum/AuthorizationType.enum';
import { BodyType } from '../../../common/enum/BodyType.enum';

export default class RequestApiSaveDto {
  @ApiProperty({ example: 'New Request' })
  @IsString()
  name: string;

  @ApiProperty({ example: '2' })
  @IsNumber()
  collectionId: number;
}
