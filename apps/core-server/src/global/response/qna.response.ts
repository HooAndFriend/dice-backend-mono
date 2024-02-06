import {
  createErrorResponse,
  createMessageResponse,
  createResponse,
  createPaginationResponse,
} from './common';

export const QnaResponse = {
  saveQna: {
    200: createMessageResponse({
      statusCode: 200,
      message: 'Qna를 생성했습니다.',
    }),
  },
};
