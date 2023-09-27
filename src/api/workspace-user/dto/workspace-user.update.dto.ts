// ** Swagger Imports
import { ApiProperty } from '@nestjs/swagger';

// ** Pipe Imports
import { IsEnum, IsNumber } from 'class-validator';

// ** Enum Imports
import { WorkspaceRoleType } from '../../../common/enum/WorkspaceRoleType.enum';

export default class RequestWorkspaceUpdateUpdateDto {
  @ApiProperty({ example: 1 })
  @IsNumber()
  id: number;

  @ApiProperty({ example: WorkspaceRoleType.VIEWER })
  @IsEnum(WorkspaceRoleType)
  role: WorkspaceRoleType;
}
