// ** Swagger Imports
import { ApiProperty } from '@nestjs/swagger';

// ** Pipe Imports
import { IsEnum, IsNumber, IsString } from 'class-validator';
import { IsNull } from '../../../../common/enum/ColumnType.enum';

export default class RequestMappingSaveDto {
  @ApiProperty({ example: 2 })
  @IsNumber()
  tableParentId: number;

  @ApiProperty({ example: 1 })
  @IsNumber()
  tableChildId: number;
}
