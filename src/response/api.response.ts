import {
  createErrorResponse,
  createMessageResponse,
  createResponse,
} from './common';

export const RequestApiResponse = {
  saveApi: {
    200: createMessageResponse({
      statusCode: 200,
      message: '새로운 request를 생성합니다.',
    }),
  },

  updateApi: {
    200: createMessageResponse({
      statusCode: 200,
      message: 'api를 수정합니다.',
    }),
    404: createErrorResponse({
      statusCode: 404,
      message: '해당 api를 찾을 수 없습니다.',
      error: 'NOT FOUND',
    }),
  },

  findApi: {
    200: createResponse({
      data: {
        id: 1,
        name: 'New Api',
      },
      statusCode: 200,
      message: 'Api 정보를 조회합니다.',
    }),
    404: createErrorResponse({
      statusCode: 404,
      message: 'Api를 찾을 수 없습니다.',
      error: 'NOT FOUND',
    }),
  },
  deleteApi: {
    200: createMessageResponse({
      statusCode: 200,
      message: 'Api를 삭제했습니다.',
    }),
    404: createErrorResponse({
      statusCode: 404,
      message: 'Api를 찾을 수 없습니다.',
      error: 'NOT FOUND',
    }),
  },
};
