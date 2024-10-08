import {
  createErrorResponse,
  createMessageResponse,
  createResponse,
} from './common';

export const AdminAuthResponse = {
  adminLogin: {
    200: createResponse({
      data: {
        admin: {
          email: 'admin',
          role: 'MASTER',
          nickname: 'ADMIN',
          profile: '',
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
  findPassword: {
    200: createMessageResponse({
      statusCode: 200,
      message: 'Success Find Password',
    }),
    404: createErrorResponse({
      statusCode: 404,
      message: '관리자를 찾을 수 없습니다.',
      error: 'NOT FOUND',
    }),
  },
  updatePassword: {
    200: createMessageResponse({
      statusCode: 200,
      message: '비밀번호가 변경되었습니다.',
    }),
    404: createErrorResponse({
      statusCode: 404,
      message: '관리자를 찾을 수 없습니다.',
      error: 'NOT FOUND',
    }),
  },
};
