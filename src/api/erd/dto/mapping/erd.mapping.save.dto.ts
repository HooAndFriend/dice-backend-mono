// ** Swagger Imports
import { ApiProperty } from '@nestjs/swagger';

// ** Pipe Imports
import { IsEnum, IsNumber, IsString } from 'class-validator';
import { IsNull, MappingType } from '../../../../common/enum/ErdType.enum';

export default class RequestMappingSaveDto {
  @ApiProperty({ example: 2 })
  @IsNumber()
  tableParentId: number;

  @ApiProperty({ example: 1 })
  @IsNumber()
  tableChildId: number;

  @ApiProperty({ example: MappingType.OneToMany })
  @IsEnum(MappingType)
  type: MappingType;
}
