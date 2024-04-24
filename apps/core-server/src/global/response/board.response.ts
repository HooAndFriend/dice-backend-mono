import {
  createErrorResponse,
  createMessageResponse,
  createResponse,
  createPaginationResponse,
} from './common';

export const BoardResponse = {
  saveBoard: {
    200: createMessageResponse({
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
        createdDate: '2024-04-24T08:35:28.504Z',
        modifiedDate: '2024-04-24T08:35:28.504Z',
        id: 22,
        title: '회의록',
        content: null,
        createdId: 'admin',
        modifiedId: 'admin',
        orderId: 1,
        isDeleted: false,
        children: [],
        parent: null,
        createdUser: {
          id: 1,
          profile: 'https://file.hi-dice.com/file//workspaceLogo.png',
          nickname: 'DICE ADMIN',
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
