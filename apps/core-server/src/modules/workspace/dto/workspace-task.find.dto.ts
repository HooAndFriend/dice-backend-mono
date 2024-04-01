// ** Swagger Imports
import { ApiProperty } from '@nestjs/swagger';

// ** Pipe Imports
import { IsDateString, Matches } from 'class-validator';

export default class RequestWorkspaceTaskFindDto {
  @ApiProperty({ example: '2024-04', required: true })
  @Matches(/^\d{4}-\d{2}$/)
  @IsDateString()
  date: string;
}
