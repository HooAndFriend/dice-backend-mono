// ** Swagger Imports
import { ApiProperty } from '@nestjs/swagger';

// ** Pipe Imports
import { IsNumber, IsString } from 'class-validator';
export default class RequestSprintUpdateInfoDto {
  @ApiProperty({ example: 1 })
  @IsNumber()
  sprintId: number;

  @ApiProperty({ example: '수정된 Sprint 이름입니다.' })
  @IsString()
  name: string;

  @ApiProperty({ example: '2024-04-04' })
  @IsString()
  startDate: string;

  @ApiProperty({ example: '2024-04-04' })
  @IsString()
  endDate: string;
}
