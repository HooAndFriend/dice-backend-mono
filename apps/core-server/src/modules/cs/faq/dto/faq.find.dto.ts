// ** Swagger Imports
import { ApiProperty } from '@nestjs/swagger';

// ** Pipe Imports
import { IsOptional, IsString } from 'class-validator';

// ** Dto Imports
import { RequestPagingDto } from '@hi-dice/common';

export default class RequestFaqFindDto extends RequestPagingDto {
  @ApiProperty({ example: '이거는 어떻게 해요?', required: false })
  @IsOptional()
  @IsString()
  question: string;
}
