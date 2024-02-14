// ** Swagger Imports
import RequestPagingDto from '@/src/global/dto/paging.dto';
import { UserType } from '@/src/global/enum/UserType.enum';
import { ApiProperty } from '@nestjs/swagger';

// ** Pipe Imports
import {
  IsDateString,
  IsEnum,
  IsOptional,
  IsString,
  Matches,
} from 'class-validator';

export default class RequestTeamFindDto extends RequestPagingDto {
  @ApiProperty({ example: 'HooAndFriend', required: false })
  @IsOptional()
  @IsString()
  name: string;

  @ApiProperty({ example: 'HooAndFriend', required: false })
  @IsOptional()
  @IsString()
  createdId: string;

  @ApiProperty({ example: 'HooAndFriend', required: false })
  @IsOptional()
  @IsString()
  description: string;

  @ApiProperty({ example: '2023-12-23', required: false })
  @IsOptional()
  @IsDateString()
  @Matches(/^\d{4}-\d{2}-\d{2}$/)
  createdStartDate: string;

  @ApiProperty({ example: '2023-12-23', required: false })
  @IsOptional()
  @IsDateString()
  @Matches(/^\d{4}-\d{2}-\d{2}$/)
  createdEndDate: string;
}
