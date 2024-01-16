// ** Swagger Imports
import { ApiProperty } from '@nestjs/swagger';

// ** Pipe Imports
import { IsEnum, IsNumber, IsString } from 'class-validator';
import { QaStatus } from '@/src/global/enum/QaStatus.enum';
export default class RequestQaStatusUpdateDto {
  @ApiProperty({ example: 1 })
  @IsNumber()
  qaId: number;

  @ApiProperty({ example: QaStatus.COMPLETE, enum: QaStatus })
  @IsEnum(QaStatus)
  status: QaStatus;
}
