import {
  createErrorResponse,
  createMessageResponse,
  createResponse,
} from './common';

export const CollectionResponse = {
  saveCollection: {
    200: createMessageResponse({
      statusCode: 200,
      message: 'colleciotn을 생성합니다.',
    }),
  },
  updateCollection: {
    200: createMessageResponse({
      statusCode: 200,
      message: 'collection을 수정합니다.',
    }),
    404: createErrorResponse({
      statusCode: 404,
      message: 'collection을 찾을 수 없습니다.',
      error: 'NOT FOUND',
    }),
  },
  findCollection: {
    200: createResponse({
      data: {
        id: 1,
        name: 'New Colleciton',
      },
      statusCode: 200,
      message: 'collection 정보를 조회합니다.',
    }),
    404: createErrorResponse({
      statusCode: 404,
      message: 'collection을 찾을 수 없습니다.',
      error: 'NOT FOUND',
    }),
  },
  deleteCollection: {
    200: createMessageResponse({
      statusCode: 200,
      message: 'collection을 .',
    }),
    404: createErrorResponse({
      statusCode: 404,
      message: 'collection을 찾을 수 없습니다.',
      error: 'NOT FOUND',
    }),
  },
};
