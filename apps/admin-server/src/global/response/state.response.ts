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
      data: {},
      statusCode: 200,
      message: '상태값을 조회했습니다.',
    }),
    404: createErrorResponse({
      statusCode: 404,
      message: '존재하지 않는 상태값입니다.',
      error: 'NOT FOUND',
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
