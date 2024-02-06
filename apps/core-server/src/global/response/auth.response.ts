import { createErrorResponse, createResponse } from './common';

export const AuthResponse = {
  saveSocialUser: {
    200: createResponse({
      data: {
        token: {
          accessToken:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjk1NjYwNDM2LCJleHAiOjE2OTU2NjQwMzZ9.HBA68et_DGrV4wOuZzDx0b5IB9QMxIMTz9ydcIzD-pY',
          refreshToken:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjk1NjYwNDM2LCJleHAiOjE2OTYyNjUyMzZ9.mDrmKQNp7f8e-hztcF13bJSWr9Q8JbnzjI6vYOG84BA',
        },
        user: {
          nickname: '피노피노얍',
          profile:
            'https://firebasestorage.googleapis.com/v0/b/dice-dev-a5b63.appspot.com/o/images%2F%E1%84%85%E1%85%A9%E1%84%80%E1%85%A9.png?alt=media&token=da1aeee5-3cd9-4be1-a99c-80d80bee3f7c',
          email: 'inhoo987654321@gmail.com',
        },
        workspace: {
          id: 5,
          name: 'Pinomaker',
          profile:
            'https://firebasestorage.googleapis.com/v0/b/dice-dev-a5b63.appspot.com/o/images%2F%E1%84%85%E1%85%A9%E1%84%80%E1%85%A9.png?alt=media&token=da1aeee5-3cd9-4be1-a99c-80d80bee3f7c',
          uuid: '83247d2d-4610-49ea-bd87-a5941a816fb3',
          workspaceFunction: [],
        },
      },
      statusCode: 200,
      message: '회원가입에 성공했습니다.',
    }),
    400: createErrorResponse({
      statusCode: 400,
      message: '이미 회원가입한 유저 입니다.',
      error: 'BAD REQUEST',
    }),
  },
  loginSocialUser: {
    200: createResponse({
      data: {
        token: {
          accessToken:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjk1NjYwNDM2LCJleHAiOjE2OTU2NjQwMzZ9.HBA68et_DGrV4wOuZzDx0b5IB9QMxIMTz9ydcIzD-pY',
          refreshToken:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjk1NjYwNDM2LCJleHAiOjE2OTYyNjUyMzZ9.mDrmKQNp7f8e-hztcF13bJSWr9Q8JbnzjI6vYOG84BA',
        },
        user: {
          nickname: '피노피노얍',
          profile:
            'https://firebasestorage.googleapis.com/v0/b/dice-dev-a5b63.appspot.com/o/images%2F%E1%84%85%E1%85%A9%E1%84%80%E1%85%A9.png?alt=media&token=da1aeee5-3cd9-4be1-a99c-80d80bee3f7c',
          email: 'inhoo987654321@gmail.com',
        },
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
    200: createResponse({
      data: {
        token: {
          accessToken:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjk1NjYwNDM2LCJleHAiOjE2OTU2NjQwMzZ9.HBA68et_DGrV4wOuZzDx0b5IB9QMxIMTz9ydcIzD-pY',
          refreshToken:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjk1NjYwNDM2LCJleHAiOjE2OTYyNjUyMzZ9.mDrmKQNp7f8e-hztcF13bJSWr9Q8JbnzjI6vYOG84BA',
        },
        user: {
          nickname: '피노피노얍',
          profile:
            'https://firebasestorage.googleapis.com/v0/b/dice-dev-a5b63.appspot.com/o/images%2F%E1%84%85%E1%85%A9%E1%84%80%E1%85%A9.png?alt=media&token=da1aeee5-3cd9-4be1-a99c-80d80bee3f7c',
          email: 'inhoo987654321@gmail.com',
        },
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
  saveDiceUser: {
    200: createResponse({
      data: {
        token: {
          accessToken:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjk1NjYwNDM2LCJleHAiOjE2OTU2NjQwMzZ9.HBA68et_DGrV4wOuZzDx0b5IB9QMxIMTz9ydcIzD-pY',
          refreshToken:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjk1NjYwNDM2LCJleHAiOjE2OTYyNjUyMzZ9.mDrmKQNp7f8e-hztcF13bJSWr9Q8JbnzjI6vYOG84BA',
        },
        user: {
          nickname: '피노피노얍',
          profile:
            'https://firebasestorage.googleapis.com/v0/b/dice-dev-a5b63.appspot.com/o/images%2F%E1%84%85%E1%85%A9%E1%84%80%E1%85%A9.png?alt=media&token=da1aeee5-3cd9-4be1-a99c-80d80bee3f7c',
          email: 'inhoo987654321@gmail.com',
        },
        workspace: {
          id: 5,
          name: 'Pinomaker',
          profile:
            'https://firebasestorage.googleapis.com/v0/b/dice-dev-a5b63.appspot.com/o/images%2F%E1%84%85%E1%85%A9%E1%84%80%E1%85%A9.png?alt=media&token=da1aeee5-3cd9-4be1-a99c-80d80bee3f7c',
          uuid: '83247d2d-4610-49ea-bd87-a5941a816fb3',
          workspaceFunction: [],
        },
      },
      statusCode: 200,
      message: '회원가입에 성공했습니다.',
    }),
    400: createErrorResponse({
      statusCode: 400,
      message: '이미 회원가입한 유저 입니다.',
      error: 'BAD REQUEST',
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
