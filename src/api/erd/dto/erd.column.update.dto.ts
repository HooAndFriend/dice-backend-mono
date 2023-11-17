// ** Swagger Imports
import { ApiProperty } from '@nestjs/swagger';

// ** Pipe Imports
import { IsEnum, IsNumber, IsString } from 'class-validator';
import { ColumnType, IsNull } from '../../../common/enum/ColumnType.enum';

export default class RequestColumnUpdateDto {
  @ApiProperty({ example: 1 })
  @IsNumber()
  columnId: number;

  @ApiProperty({ example: ColumnType.PK, enum: ColumnType })
  @IsEnum(ColumnType)
  key: ColumnType;

  @ApiProperty({ example: 'testColumn' })
  @IsString()
  name: string;

  @ApiProperty({ example: '예시 컬럼' })
  @IsString()
  comment: string;

  @ApiProperty({ example: 'integer' })
  @IsString()
  data_type: string;

  @ApiProperty({ example: IsNull.N, enum: IsNull })
  @IsEnum(IsNull)
  isnull: IsNull;

  @ApiProperty({ example: 'auto_increment' })
  @IsString()
  option: string;
}
