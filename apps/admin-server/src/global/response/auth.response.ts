import { createErrorResponse, createResponse } from './common';

export const AuthResponse = {
  adminLogin: {
    200: createResponse({
      data: {
        admin: {
          createdAt: '2024-02-06T05:49:57.188Z',
          updatedAt: '2024-02-06T05:49:57.188Z',
          id: 1,
          email: 'admin',
          password:
            '$2a$10$iM8h/1wR.hW/5t9cuvu5Ju8SP6Ya7L0JQve3WB2TCqVOYy.fZVEeO',
          role: 'MASTER',
          nickname: 'ADMIN',
          profile: '',
          createdId: '',
        },
        token: {
          accessToken:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6Ik1BU1RFUiIsImlhdCI6MTcwNzE5ODYwMSwiZXhwIjoxNzA3MjAyMjAxfQ.1GiX28rOW8WHv13CyJZ-ltldMTCt2T_tAmnFfJX83Es',
          refreshToken:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6Ik1BU1RFUiIsImlhdCI6MTcwNzE5ODYwMSwiZXhwIjoxNzA3ODAzNDAxfQ.zs8oczc8AJDf1X5-u9cpVWGntBzAAYhF8SE4uOrVHQ8',
        },
      },
      statusCode: 200,
      message: 'Success Admin Login',
    }),
    400: createErrorResponse({
      statusCode: 400,
      message: '비밀번호가 맞지 않습니다.',
      error: 'BAD REQUEST',
    }),
    404: createErrorResponse({
      statusCode: 404,
      message: '관리자를 찾을 수 없습니다.',
      error: 'NOT FOUND',
    }),
  },

  reissueToken: {
    200: createResponse({
      data: {
        accessToken:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjk1NTcxMjM2LCJleHAiOjE2OTU1NzQ4MzZ9.IAu_paMVmVSrPtNPfi4lNTUw9kIHBWEo8If9WbCxcBY',
      },
      statusCode: 200,
      message: '토큰을 재발급합니다.',
    }),
  },
};
