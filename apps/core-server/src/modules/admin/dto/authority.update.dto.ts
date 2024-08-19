// ** Swagger Imports
import { ApiProperty } from '@nestjs/swagger';

// ** Pipe Imports
import { IsBoolean, IsNumber } from 'class-validator';

export default class RequestAuthorityUpdateDto {
  @ApiProperty({ example: 1 })
  @IsNumber()
  authorityId: number;

  @ApiProperty({ example: 'true' })
  @IsBoolean()
  dashboardYn: boolean;

  @ApiProperty({ example: 'true' })
  @IsBoolean()
  userYn: boolean;

  @ApiProperty({ example: 'true' })
  @IsBoolean()
  inactiveUserYn: boolean;

  @ApiProperty({ example: 'true' })
  @IsBoolean()
  teamYn: boolean;

  @ApiProperty({ example: 'true' })
  @IsBoolean()
  workspaceYn: boolean;

  @ApiProperty({ example: 'true' })
  @IsBoolean()
  qnaYn: boolean;

  @ApiProperty({ example: 'true' })
  @IsBoolean()
  faqYn: boolean;

  @ApiProperty({ example: 'true' })
  @IsBoolean()
  programYn: boolean;

  @ApiProperty({ example: 'true' })
  @IsBoolean()
  stateYn: boolean;

  @ApiProperty({ example: 'true' })
  @IsBoolean()
  adminYn: boolean;
}
