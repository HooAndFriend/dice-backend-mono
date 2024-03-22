// ** Swagger Imports
import { ApiProperty } from '@nestjs/swagger';

// ** Pipe Imports
import { IsOptional, IsString } from 'class-validator';

export default class RequestWorkspaceUserFindDto {
  @ApiProperty({ example: 'Pinomaker', required: false })
  @IsString()
  @IsOptional()
  name: string;
}
