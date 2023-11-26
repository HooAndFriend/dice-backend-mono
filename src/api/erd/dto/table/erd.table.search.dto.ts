import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export default class ReqeustTableSearchDto {
  @ApiProperty({ example: 1 })
  @IsNumber()
  workspaceId: number;

  @ApiProperty({ example: 'test' })
  @IsString()
  find: string;
}
