// ** Swagger Imports
import { ApiProperty } from '@nestjs/swagger';

// ** Pipe Imports
import { IsDateString, IsOptional, IsString, Matches } from 'class-validator';

export default class RequestTicketFindDto {
  @ApiProperty({ example: '2024-02-02', required: false })
  @IsDateString()
  @Matches(/^\d{4}-\d{2}-\d{2}$/)
  @IsOptional()
  dueDate: string;

  @ApiProperty({ example: '2024-02-24', required: false })
  @IsDateString()
  @Matches(/^\d{4}-\d{2}-\d{2}$/)
  @IsOptional()
  completeDate: Date;

  @ApiProperty({ example: 'Ticket 내용입니다', required: false })
  @IsString()
  @IsOptional()
  content: string;
}
