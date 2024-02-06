// ** Swagger Imports
import { ApiProperty } from '@nestjs/swagger';

// ** Pipe Imports
import { IsNumber, IsString } from 'class-validator';

export default class RequestWorkspaceUpdateDto {
  @ApiProperty({ example: 'HooAndFriend' })
  @IsString()
  name: string;

  @ApiProperty({ example: '이 워크스페이스는..' })
  @IsString()
  comment: string;

  @ApiProperty({ example: 'http://localhost:3000' })
  @IsString()
  profile: string;
}
