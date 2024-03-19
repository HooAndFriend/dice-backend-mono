// ** Swagger Imports
import { ApiProperty } from '@nestjs/swagger';

// ** Pipe Imports
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { QaStatus } from '@/src/global/enum/QaStatus.enum';
import { Type } from 'class-transformer';
export default class RequestQaFindDto {
  @ApiProperty({
    example: QaStatus.NOTHING,
    enum: QaStatus,
    required: false,
    type: QaStatus,
  })
  @IsOptional()
  @IsEnum(QaStatus)
  status: QaStatus;

  @ApiProperty({ example: 'QA 제목입니다.', required: false })
  @IsString()
  @IsOptional()
  title: string;

  @ApiProperty({ example: 'Pinomaker', required: false })
  @IsString()
  @IsOptional()
  adminNickname: string;

  @ApiProperty({ example: 'Pinomaker', required: false })
  @IsString()
  @IsOptional()
  workerNickname: string;
}
