// ** Swagger Imports
import { RequestPagingDto } from '@hi-dice/common';
import { UserType } from '@hi-dice/common';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

// ** Pipe Imports
import {
  IsArray,
  IsDateString,
  IsEnum,
  IsOptional,
  IsString,
  Matches,
} from 'class-validator';

export default class RequestUserFindDto extends RequestPagingDto {
  @ApiProperty({ example: 'HooAndFriend', required: false })
  @IsOptional()
  @IsString()
  nickname: string;

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

  @ApiProperty({ example: '2023-12-23', required: false })
  @IsOptional()
  @IsDateString()
  @Matches(/^\d{4}-\d{2}-\d{2}$/)
  lastLoginStartDate: string;

  @ApiProperty({ example: '2023-12-23', required: false })
  @IsOptional()
  @IsDateString()
  @Matches(/^\d{4}-\d{2}-\d{2}$/)
  lastLoginEndDate: string;

  @Transform(
    ({ value }) => (typeof value === 'string' ? [value] : [...value]),
    {
      toClassOnly: true,
    },
  )
  @IsArray()
  @IsOptional()
  @IsString({ each: true })
  type: string[];
}
