import {
  createErrorResponse,
  createMessageResponse,
  createResponse,
} from './common';

export const UserResponse = {
  updateUser: {
    200: createMessageResponse({
      statusCode: 200,
      message: '유저의 정보를 수정합니다.',
    }),
    400: createErrorResponse({
      statusCode: 400,
      error: 'BAD REQUEST',
      message: '이미 사용 중인 이메일 입니다.',
    }),
  },
  findUser: {
    200: createResponse({
      data: {
        nickname: '피노피노얍',
        email: 'inhoo987654321@gmail.com',
        profile:
          'https://firebasestorage.googleapis.com/v0/b/dice-dev-a5b63.appspot.com/o/images%2F%E1%84%85%E1%85%A9%E1%84%80%E1%85%A9.png?alt=media&token=da1aeee5-3cd9-4be1-a99c-80d80bee3f7c',
        link: null,
      },
      statusCode: 200,
      message: '유저 정보를 조회합니다.',
    }),
    404: createErrorResponse({
      statusCode: 404,
      error: 'NOT FOUND',
      message: '유저 정보를 찾을 수 없습니다.',
    }),
  },
};
