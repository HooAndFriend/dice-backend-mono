import { createErrorResponse, createResponse } from './common';

export const InternalResponse = {
  findUserProfileList: {
    200: createResponse({
      data: [
        {
          email: 'admin',
          nickname: 'DICE ADMIN',
          profile: 'https://file.hi-dice.com/file//workspaceLogo.png',
        },
      ],
      statusCode: 200,
      message: '유저의 정보를 조회합니다.',
    }),
  },
};
