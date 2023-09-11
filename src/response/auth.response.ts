import {
  createErrorResponse,
  createMessageResponse,
  createSuccessResponse,
} from './common';

export const AuthResponse = {
  saveUser: {
    200: createSuccessResponse({
      message: '전화번호를 생성합니다.',
      statusCode: 200,
      data: {
        data: {
          accessToken:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6IlVTRVIiLCJpYXQiOjE2OTQ0NDM5MjcsImV4cCI6MTY5NDQ0NzUyN30.pUfR0BncjlsbKKBCr0n5cpaaZRgxvdIgCaEgnSP6ZyQ',
          refreshToken:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6IlVTRVIiLCJpYXQiOjE2OTQ0NDM5MjcsImV4cCI6MTY5NTA0ODcyN30.1AHIFH9JdJpawAHqPJEMLdhDP1iJiEGZUdyijPsPMf0',
        },
        statusCode: 200,
        message: '회원가입 했습니다.',
      },
    }),
    400: createErrorResponse({
      statusCode: 400,
      message: '이미 회원가입한 유저 입니다.',
      error: 'BAD REQUEST',
    }),
  },
};
