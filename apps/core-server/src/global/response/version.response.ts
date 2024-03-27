import { createErrorResponse, createResponse } from './common';

export const VersionResponse = {
  findLastestVersion: {
    200: createResponse({
      data: {
        createdDate: '2024-03-25T16:08:53.645Z',
        modifiedDate: '2024-03-25T16:08:53.645Z',
        id: 5,
        _version: '2.0.5',
        program: 'https://s3.bucket.com/123.pdf',
        type: 'WINDOW',
        memo: '메모할 것',
        createdId: 'admin',
        modifiedId: 'admin',
      },
      statusCode: 200,
      message: '가장 최신 Version을 조회합니다.',
    }),
    400: createErrorResponse({
      statusCode: 400,
      message: '해당 type 버전이 없습니다.',
      error: 'NOT FOUND',
    }),
  },
};
