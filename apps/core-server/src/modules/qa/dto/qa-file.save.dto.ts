// ** Swagger Imports
import { ApiProperty } from '@nestjs/swagger';

// ** Pipe Imports
import { IsArray, IsNumber, IsString } from 'class-validator';

export default class RequestQaFileSaveDto {
  @ApiProperty({ example: 1 })
  @IsNumber()
  qaId: number;

  @ApiProperty({
    example:
      'https://health.chosun.com/site/data/img_dir/2023/07/17/2023071701753_0.jpg',
  })
  @IsString()
  url: string;
}
