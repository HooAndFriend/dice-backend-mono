// ** Swagger Imports
import { ApiProperty } from '@nestjs/swagger';

// ** Pipe Imports
import { IsEnum, IsNumber, IsString } from 'class-validator';
import { ColumnType } from '../../../common/enum/ColumnType.enum';

export default class RequestColumnUpdateDto {
  @ApiProperty({ example: ColumnType.PK, enum: ColumnType })
  @IsEnum(ColumnType)
  key: ColumnType;

  @ApiProperty({ example: 'testColumn' })
  @IsString()
  column: string;

  @ApiProperty({ example: '예시 컬럼' })
  @IsString()
  comment: string;

  @ApiProperty({ example: 'integer' })
  @IsString()
  data_type: string;

  @ApiProperty({ example: 'N' })
  @IsString()
  isnull: string;

  @ApiProperty({ example: 'auto_increment' })
  @IsString()
  option: string;
}
