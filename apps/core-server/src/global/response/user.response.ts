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
        email: 'admin',
        nickname: 'Pinomaker',
        profile:
          'https://firebasestorage.googleapis.com/v0/b/dice-dev-a5b63.appspot.com/o/images%2FIMG_6159.jpg?alt=media&token=450c0181-8826-4856-b611-509712872450',
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
  findDashboardInfo: {
    200: createResponse({
      data: {
        teamCount: 1,
        ticketCount: 0,
      },
      statusCode: 200,
      message: '유저의 대시보드 정보를 조회합니다.',
    }),
  },
};
