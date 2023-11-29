// ** Swagger Imports
import { ApiProperty } from '@nestjs/swagger';

// ** Pipe Imports
import { IsNumber, IsString } from 'class-validator';

export default class RequestCollectionSaveDto {
  @ApiProperty({ example: 'New Collection' })
  @IsString()
  name = 'New Collection';

  @ApiProperty({ example: 10 })
  @IsNumber()
  workspaceId: number;
}
