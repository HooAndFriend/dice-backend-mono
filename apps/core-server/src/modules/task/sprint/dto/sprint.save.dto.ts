// ** Swagger Imports
import { ApiProperty } from '@nestjs/swagger';

// ** Enum Imports
import { SprintStatusEnum } from '../enum/sprint.enum';

// ** Dto Imports
import RequestSimpleTicketSaveDto from '../../ticket/dto/ticket/ticket.save.dto';

// ** Pipe Imports
import {
  IsArray,
  IsDateString,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
} from 'class-validator';
import TicketSetting from '../../ticket-setting/domain/ticket.setting.entity';

export default class RequestSprintSaveDto {
  @ApiProperty({ example: '스프린트 이름' })
  @IsString()
  title: string;

  @Matches(/^\d{4}-\d{2}-\d{2}$/)
  @IsOptional()
  @IsDateString()
  startDate: string;

  @Matches(/^\d{4}-\d{2}-\d{2}$/)
  @IsOptional()
  @IsDateString()
  endDate: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsEnum(SprintStatusEnum)
  @IsOptional()
  status: SprintStatusEnum;

  @IsNumber()
  @IsOptional()
  orderId: number;
}
