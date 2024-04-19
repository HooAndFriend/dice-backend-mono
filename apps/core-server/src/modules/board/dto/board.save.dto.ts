// ** Swagger Imports
import { ApiProperty } from '@nestjs/swagger';

// ** Pipe Imports
import { IsNumber, IsOptional, IsString } from 'class-validator';

export default class RequestBoardSaveDto {
  @ApiProperty({ example: '게시글 이름' })
  @IsString()
  title: string;

  @ApiProperty({ example: 1, required: false })
  @IsOptional()
  @IsNumber()
  parentId?: number;
}
