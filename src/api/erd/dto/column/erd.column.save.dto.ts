// ** Swagger Imports
import { ApiProperty } from '@nestjs/swagger';

// ** Pipe Imports
import { IsEnum, IsNumber, IsString } from 'class-validator';
import { ColumnType, IsNull } from '../../../../common/enum/ErdType.enum';

export default class RequestColumnSaveDto {
  @ApiProperty({ example: 2 })
  @IsNumber()
  table_id: number;

  @ApiProperty({ example: ColumnType.PK, enum: ColumnType })
  @IsEnum(ColumnType)
  key: ColumnType;

  @ApiProperty({ example: 'testColumn' })
  @IsString()
  physicalName: string;

  @ApiProperty({ example: 'testColumn' })
  @IsString()
  logicalName: string;

  @ApiProperty({ example: '예시 컬럼' })
  @IsString()
  comment: string;

  @ApiProperty({ example: 'integer' })
  @IsString()
  data_type: string;

  @ApiProperty({ example: IsNull.N, enum: IsNull })
  @IsEnum(IsNull)
  isNull: IsNull;

  @ApiProperty({ example: 'auto_increment' })
  @IsString()
  option: string;
}
