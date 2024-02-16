// ** Swagger Imports
import { ApiProperty } from '@nestjs/swagger';

// ** Pipe Imports
import { IsBoolean, IsNumber } from 'class-validator';

export default class RequestAuthorityUpdateDto {
  @ApiProperty({ example: 1 })
  @IsNumber()
  adminId: number;

  @ApiProperty({ example: 'true' })
  @IsBoolean()
  dashboard: boolean;

  @ApiProperty({ example: 'true' })
  @IsBoolean()
  user: boolean;

  @ApiProperty({ example: 'true' })
  @IsBoolean()
  inactiveUser: boolean;

  @ApiProperty({ example: 'true' })
  @IsBoolean()
  team: boolean;

  @ApiProperty({ example: 'true' })
  @IsBoolean()
  workspace: boolean;

  @ApiProperty({ example: 'true' })
  @IsBoolean()
  qna: boolean;

  @ApiProperty({ example: 'true' })
  @IsBoolean()
  faq: boolean;

  @ApiProperty({ example: 'true' })
  @IsBoolean()
  program: boolean;

  @ApiProperty({ example: 'true' })
  @IsBoolean()
  state: boolean;

  @ApiProperty({ example: 'true' })
  @IsBoolean()
  admin: boolean;
}
