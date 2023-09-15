import { createErrorResponse, createMessageResponse } from './common';

export const UserResponse = {
  updateUser: {
    200: createMessageResponse({
      statusCode: 200,
      message: '유저의 정보를 수정합니다.',
    }),
  },
};
