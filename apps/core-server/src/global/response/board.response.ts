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
};
