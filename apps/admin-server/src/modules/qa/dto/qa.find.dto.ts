// ** Swagger Imports
import {
    ApiProperty,
  } from '@nestjs/swagger';
  
  // ** Pipe Imports
  import { IsDate, IsDateString, IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
  import { QaStatus } from '@/src/global/enum/QaStatus.enum';
  import { Type } from 'class-transformer';
  export default class RequestQaFindDto {
    @ApiProperty({
      example: QaStatus.ALL,
      enum: QaStatus,
      default: QaStatus.ALL,
      type: QaStatus,
    })
    @IsEnum(QaStatus)
    status: QaStatus;

    @ApiProperty({ example : '2024-02-02', required : false})
    @IsDate()
    @Type(()=> Date)
    @IsOptional()
    createdDate : Date

    @ApiProperty({ example : '2024-02-24', required : false})
    @IsDate()
    @Type(()=> Date)
    @IsOptional()
    modifiedDate : Date
  
    @ApiProperty({ example: 'QA 제목입니다.', required: false })
    @IsString()
    @IsOptional()
    title: string;
  
    @ApiProperty({ example: 'ISSUE-01', required: false })
    @IsString()
    @IsOptional()
    number: string;
  }
  