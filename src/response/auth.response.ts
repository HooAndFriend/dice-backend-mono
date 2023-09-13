import {
  createErrorResponse,
  createMessageResponse,
  createSuccessResponse,
} from './common';

export const AuthResponse = {
  saveSocialUser: {
    200: createSuccessResponse({
      data: {
        accessToken:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6IlVTRVIiLCJpYXQiOjE2OTQ0NDM5MjcsImV4cCI6MTY5NDQ0NzUyN30.pUfR0BncjlsbKKBCr0n5cpaaZRgxvdIgCaEgnSP6ZyQ',
        refreshToken:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6IlVTRVIiLCJpYXQiOjE2OTQ0NDM5MjcsImV4cCI6MTY5NTA0ODcyN30.1AHIFH9JdJpawAHqPJEMLdhDP1iJiEGZUdyijPsPMf0',
      },
      statusCode: 200,
      message: '회원가입 했습니다.',
    }),
    400: createErrorResponse({
      statusCode: 400,
      message: '이미 회원가입한 유저 입니다.',
      error: 'BAD REQUEST',
    }),
  },
  loginSocialUser: {
    200: createSuccessResponse({
      data: {
        accessToken:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6IlVTRVIiLCJpYXQiOjE2OTQ0NDM5MjcsImV4cCI6MTY5NDQ0NzUyN30.pUfR0BncjlsbKKBCr0n5cpaaZRgxvdIgCaEgnSP6ZyQ',
        refreshToken:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6IlVTRVIiLCJpYXQiOjE2OTQ0NDM5MjcsImV4cCI6MTY5NTA0ODcyN30.1AHIFH9JdJpawAHqPJEMLdhDP1iJiEGZUdyijPsPMf0',
      },
      statusCode: 200,
      message: '로그인에 성공했습니다.',
    }),
    404: createErrorResponse({
      statusCode: 404,
      message: '유저를 찾을 수 없습니다.',
      error: 'NOT FOUND',
    }),
  },
  loginDiceUser: {
    200: createSuccessResponse({
      data: {
        accessToken:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6IlVTRVIiLCJpYXQiOjE2OTQ0NDM5MjcsImV4cCI6MTY5NDQ0NzUyN30.pUfR0BncjlsbKKBCr0n5cpaaZRgxvdIgCaEgnSP6ZyQ',
        refreshToken:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6IlVTRVIiLCJpYXQiOjE2OTQ0NDM5MjcsImV4cCI6MTY5NTA0ODcyN30.1AHIFH9JdJpawAHqPJEMLdhDP1iJiEGZUdyijPsPMf0',
      },
      statusCode: 200,
      message: '로그인에 성공했습니다.',
    }),
    400: createErrorResponse({
      statusCode: 400,
      message: '비밀번호가 맞지 않습니다.',
      error: 'BAD REQUEST',
    }),
    404: createErrorResponse({
      statusCode: 404,
      message: '유저를 찾을 수 없습니다.',
      error: 'NOT FOUND',
    }),
  },
};
