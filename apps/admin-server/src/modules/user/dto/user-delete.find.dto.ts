// ** Swagger Imports
import RequestPagingDto from '@/src/global/dto/paging.dto';
import { UserType } from '@repo/common';
import { ApiProperty } from '@nestjs/swagger';

// ** Pipe Imports
import {
  IsDateString,
  IsEnum,
  IsOptional,
  IsString,
  Matches,
} from 'class-validator';

export default class RequestDeleteUserFindDto extends RequestPagingDto {
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
  deletedStartDate: string;

  @ApiProperty({ example: '2023-12-23', required: false })
  @IsOptional()
  @IsDateString()
  @Matches(/^\d{4}-\d{2}-\d{2}$/)
  deletedEndDate: string;

  @ApiProperty({ example: UserType.APPLE, required: false, enum: UserType })
  @IsOptional()
  @IsEnum(UserType)
  type: UserType;
}
