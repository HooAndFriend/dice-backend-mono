import {
  createErrorResponse,
  createMessageResponse,
  createResponse,
  createPaginationResponse,
} from './common';

export const BoardResponse = {
  saveBoard: {
    200: createResponse({
      data: 1,
      statusCode: 200,
      message: 'Board를 생성합니다.',
    }),
    404: createErrorResponse({
      statusCode: 404,
      error: 'NOT FOUND',
      message: 'Not Found Board',
    }),
  },
  deleteBoard: {
    200: createMessageResponse({
      statusCode: 200,
      message: 'Board를 삭제합니다..',
    }),
    404: createErrorResponse({
      statusCode: 404,
      error: 'NOT FOUND',
      message: 'Not Found Board',
    }),
  },
  updateBoard: {
    200: createMessageResponse({
      statusCode: 200,
      message: 'Board를 수정합니다.',
    }),
    404: createErrorResponse({
      statusCode: 404,
      error: 'NOT FOUND',
      message: 'Not Found Board',
    }),
  },
  updateBoardTitle: {
    200: createMessageResponse({
      statusCode: 200,
      message: 'Board를 수정합니다.',
    }),
    404: createErrorResponse({
      statusCode: 404,
      error: 'NOT FOUND',
      message: 'Not Found Board',
    }),
  },
  findBoard: {
    200: createResponse({
      data: {
        createdDate: '2024-09-23T15:49:28.630Z',
        modifiedDate: '2024-09-23T15:49:53.000Z',
        boardId: 62,
        title: '게시글',
        createdId: 'dio8620@naver.com',
        modifiedId: 'dio8620@naver.com',
        orderId: 5,
        isDeleted: false,
        children: [],
        parent: null,
        content: {
          createdDate: '2024-09-23T15:49:52.938Z',
          modifiedDate: '2024-09-23T15:49:52.938Z',
          contentId: 18,
          time: '1723549214015',
          version: '2.29.1',
          blocks: [
            {
              boardBlockId: 64,
              type: 'paragraph',
              data: '{"text":"{mention-1}{mention-2}멘션 테스트입니다."}',
              mentions: [
                {
                  mentionId: 2,
                  mentionKey: 'mention-2',
                  mentioner: {
                    userId: 2,
                    email: 'dio8620@naver.com',
                    nickname: '홍길동',
                  },
                  mentionedUser: {
                    userId: 1,
                    email: 'ddd12@gmail.com',
                    nickname: '임동현',
                  },
                },
              ],
            },
          ],
        },
        createdUser: {
          id: 2,
          profile: 'https://firebasestorage.googleapis.com/v0/...',
          nickname: '임동현',
        },
      },
      statusCode: 200,
      message: 'Board를 조회합니다.',
    }),
    404: createErrorResponse({
      statusCode: 404,
      error: 'NOT FOUND',
      message: 'Not Found Board',
    }),
  },
  findBoardSimpleList: {
    200: createResponse({
      data: {
        data: [
          {
            modifiedDate: '2024-09-23T15:49:53.000Z',
            boardId: 62,
            title: '게시글 제목',
            content: {
              contentId: 18,
              time: '1723549214015',
              version: '2.29.1',
              blocks: [
                {
                  blockId: 'CWJVRWGV4N',
                  type: 'paragraph',
                  data: '{"text":"테스트입니다"}',
                },
              ],
            },
          },
          {
            modifiedDate: '2024-08-17T15:22:32.000Z',
            boardId: 2,
            title: '게시글 제목',
            content: null,
          },
        ],
        count: 2,
      },
      statusCode: 200,
      message: 'Board 리스트를 조회합니다.',
    }),
  },
  findBoardList: {
    200: createResponse({
      data: {
        data: [
          {
            createdDate: '2024-04-19T08:45:00.133Z',
            id: 4,
            title: '게시글 이름',
            children: [
              {
                createdDate: '2024-04-19T08:52:13.012Z',
                id: 15,
                title: '게시글 이름',
              },
              {
                createdDate: '2024-04-19T08:52:13.462Z',
                id: 16,
                title: '게시글 이름',
              },
              {
                createdDate: '2024-04-19T08:52:13.919Z',
                id: 17,
                title: '게시글 이름',
              },
              {
                createdDate: '2024-04-19T08:52:14.285Z',
                id: 18,
                title: '게시글 이름',
              },
            ],
          },
          {
            createdDate: '2024-04-19T08:45:01.007Z',
            id: 6,
            title: '게시글 이름',
            children: [],
          },
          {
            createdDate: '2024-04-19T08:45:01.378Z',
            id: 7,
            title: '게시글 이름',
            children: [],
          },
          {
            createdDate: '2024-04-19T08:45:01.733Z',
            id: 8,
            title: '게시글 이름',
            children: [],
          },
          {
            createdDate: '2024-04-19T08:45:02.006Z',
            id: 9,
            title: '게시글 이름',
            children: [],
          },
          {
            createdDate: '2024-04-19T08:45:02.312Z',
            id: 10,
            title: '게시글 이름',
            children: [],
          },
          {
            createdDate: '2024-04-19T08:47:23.367Z',
            id: 11,
            title: '게시글 이름',
            children: [],
          },
          {
            createdDate: '2024-04-19T08:47:23.887Z',
            id: 12,
            title: '게시글 이름',
            children: [],
          },
          {
            createdDate: '2024-04-19T08:47:24.277Z',
            id: 13,
            title: '게시글 이름',
            children: [],
          },
          {
            createdDate: '2024-04-19T08:47:24.646Z',
            id: 14,
            title: '게시글 이름',
            children: [],
          },
        ],
        count: 10,
      },
      statusCode: 200,
      message: 'Board를 리스트를 조회합니다.',
    }),
  },
};
