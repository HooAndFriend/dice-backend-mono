// ** Swagger Imports
import { ApiProperty } from '@nestjs/swagger';

// ** Pipe Imports
import { IsString } from 'class-validator';

export default class RequestCollectionSaveDto {
  @ApiProperty({ example: 'New Collection' })
  @IsString()
  name: string;
}
