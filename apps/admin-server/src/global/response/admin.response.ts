import {
  createErrorResponse,
  createMessageResponse,
  createResponse,
} from './common';

export const AdminResponse = {
  saveAdmin: {
    200: createMessageResponse({
      statusCode: 200,
      message: 'Admin을 생성했습니다.',
    }),
    400: createErrorResponse({
      statusCode: 400,
      message: '이미 존재하는 이메일입니다.',
      error: 'BAD REQUEST',
    }),
  },
};
