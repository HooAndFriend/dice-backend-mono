// ** Swagger Imports
import { QaHistoryTypeEnum } from '@hi-dice/common';
import { ApiProperty } from '@nestjs/swagger';

// ** Pipe Imports
import { IsNumber, IsString } from 'class-validator';
import Qa from '../domain/qa.entity';

export default class RequestQaSimpleUpdateDto {
  @ApiProperty({ example: 1 })
  @IsNumber()
  qaId: number;

  @ApiProperty({ example: 'title' })
  @IsString()
  type: 'title' | 'asIs' | 'toBe' | 'memo';

  @ApiProperty({ example: '수정된 문제사항입니다.' })
  @IsString()
  value: string;

  public changeQaHistoryTypeEnum() {
    switch (this.type) {
      case 'title':
        return QaHistoryTypeEnum.TITLE;
      case 'asIs':
        return QaHistoryTypeEnum.ASIS;
      case 'toBe':
        return QaHistoryTypeEnum.TOBE;
      case 'memo':
        return QaHistoryTypeEnum.MEMO;
    }
  }

  public changeLog(Qa: Qa) {
    switch (this.type) {
      case 'title':
        return `${Qa.title} -> ${this.value}`;
      case 'asIs':
        return `${Qa.asIs} -> ${this.value}`;
      case 'toBe':
        return `${Qa.toBe} -> ${this.value}`;
      case 'memo':
        return `${Qa.memo} -> ${this.value}`;
    }
  }
}
