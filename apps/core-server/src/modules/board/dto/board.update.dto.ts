// ** Swagger Imports
import { ApiProperty } from '@nestjs/swagger';

// ** Pipe Imports
import { IsNumber, IsString } from 'class-validator';

export interface BoardContentInterface {
  time: number;
  version: string;
  blocks: any[];
}

export interface MentionInterface {
  blockId: number;
  mentionKey: string;
  userId: number;
  userNickname: string;
}

export interface BoardBlockInterface {
  id: string;
  type: string;
  data: any;
}

export default class RequestBoardUpdateDto {
  @ApiProperty({ example: '게시글 이름' })
  @IsString()
  title: string;

  @ApiProperty({
    example: {
      time: 1632038400000,
      version: '1.0.0',
      blocks: [
        {
          id: '1',
          type: 'text',
          data: {
            text: '{mention-1}{mention-2}멘션 테스트입니다.',
          },
        },
      ],
    },
  })
  content: BoardContentInterface;

  @ApiProperty({
    example: [
      {
        blockId: '1',
        mentionKey: 'mention-1',
        userId: 1,
        userNickname: '홍길동',
      },
      {
        blockId: '1',
        mentionKey: 'mention-2',
        userId: 2,
        userNickname: '김석봉',
      },
    ],
  })
  mentions: MentionInterface[];

  @ApiProperty({ example: 1 })
  @IsNumber()
  boardId: number;
}
