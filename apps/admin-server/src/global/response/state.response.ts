import {
  createErrorResponse,
  createMessageResponse,
  createResponse,
} from './common';

export const StateResponse = {
  saveState: {
    200: createMessageResponse({
      statusCode: 200,
      message: '상태값을 생성했습니다.',
    }),
    400: createErrorResponse({
      statusCode: 400,
      message: '이미 존재하는 상태값입니다.',
      error: 'BAD REQUEST',
    }),
  },
  findState: {
    200: createResponse({
      data: {
        createdDate: '2024-02-16T13:24:42.234Z',
        modifiedDate: '2024-02-16T13:24:42.234Z',
        id: 5,
        name: '완료됨',
        color: '#FF0000',
        description: '완료된 티켓',
        exposeYn: true,
      },
      statusCode: 200,
      message: '상태값을 조회합니다.',
    }),
    404: createErrorResponse({
      statusCode: 404,
      message: '존재하지 않는 상태값입니다.',
      error: 'NOT FOUND',
    }),
  },
  findStateList: {
    200: createResponse({
      data: {
        data: [
          {
            id: 5,
            name: '완료됨',
            color: '#FF0000',
            description: '완료된 티켓',
          },
          {
            id: 4,
            name: '진행중',
            color: '#ffffff',
            description: '진행중인 티켓',
          },
        ],
        count: 2,
      },
      statusCode: 200,
      message: '상태값 리스트를 조회합니다.',
    }),
  },
  deleteState: {
    200: createMessageResponse({
      statusCode: 200,
      message: '상태값을 삭제했습니다.',
    }),
    404: createErrorResponse({
      statusCode: 404,
      message: '존재하지 않는 상태값입니다.',
      error: 'NOT FOUND',
    }),
  },
  updateState: {
    200: createMessageResponse({
      statusCode: 200,
      message: '상태값을 수정했습니다.',
    }),
    404: createErrorResponse({
      statusCode: 404,
      message: '존재하지 않는 상태값입니다.',
      error: 'NOT FOUND',
    }),
  },
};
