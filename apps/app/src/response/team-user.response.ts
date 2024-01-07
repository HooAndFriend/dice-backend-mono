import {
  createErrorResponse,
  createMessageResponse,
  createPaginationResponse,
  createResponse,
} from './common';

export const TeamUserResponse = {
  findTeamList: {
    200: createResponse({
      data: {
        data: [
          {
            id: 1,
            team: {
              name: 'HooAndFriend',
              profile: '이 워크스페이스는..',
            },
          },
          {
            id: 2,
            team: {
              name: '123',
              profile: '이 워크스페이스는..',
            },
          },
        ],
        count: 2,
      },
      statusCode: 200,
      message: 'Find User Team List',
    }),
  },
};
