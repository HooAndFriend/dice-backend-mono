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
};
