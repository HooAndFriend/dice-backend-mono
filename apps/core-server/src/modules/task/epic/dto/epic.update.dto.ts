// ** Swagger Imports
import { ApiProperty } from '@nestjs/swagger';

// ** Pipe Imports
import { IsNumber, IsString } from 'class-validator';

export default class RequestEpicUpdateDto {
  @ApiProperty({ example: 2 })
  @IsNumber()
  epicId: number;

  @ApiProperty({ example: 'DICE 로그인 수정' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'DICE ' })
  @IsString()
  content: string;
}
