import {
  createErrorResponse,
  createMessageResponse,
  createPaginationResponse,
  createResponse,
} from './common';

export const CollectionResponse = {
  saveCollection: {
    200: createMessageResponse({
      statusCode: 200,
      message: 'collection을 생성합니다.',
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

  deleteCollection: {
    200: createMessageResponse({
      statusCode: 200,
      message: 'collection을 삭제했습니다.',
    }),
    404: createErrorResponse({
      statusCode: 404,
      message: 'collection을 찾을 수 없습니다.',
      error: 'NOT FOUND',
    }),
  },

  findCollectionList: {
    200: createPaginationResponse({
      data: [
        {
          id: 1,
          name: 'New Collection',
          api: [
            {
              id: 1,
              name: 'New Request',
              type: 'POST',
              endpoint: 'localhost:8080/api/...',
              createdUser: 'yoona',
              modifiedUser: 'yoona',
            },
          ],
        },
      ],
      count: 1,
      statusCode: 200,
      message: 'collection을 조회합니다.',
    }),
  },
};
