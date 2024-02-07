import {
  createErrorResponse,
  createMessageResponse,
  createResponse,
} from './common';

export const VersionResponse = {
  saveVersion: {
    200: createMessageResponse({
      statusCode: 200,
      message: 'Version을 생성했습니다.',
    }),
    400: createErrorResponse({
      statusCode: 400,
      message: '이미 존재하는 버전입니다.',
      error: 'BAD REQUEST',
    }),
  },
  findVersionList: {
    200: createResponse({
      data: {
        data: [
          {
            createdAt: '2024-02-07T03:37:55.334Z',
            updatedAt: '2024-02-07T03:37:55.334Z',
            id: 1,
            version: '1.0.5',
            memo: '메모할 것',
            createdId: 'admin',
          },
        ],
        count: 1,
      },
      statusCode: 200,
      message: 'Version 리스트를 조회합니다.',
    }),
  },
};
