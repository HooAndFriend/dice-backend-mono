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
            role: 'ADMIN',
            team: {
              name: 'HooAndFriend',
              profile: '이 워크스페이스는..',
            },
          },
        ],
        count: 1,
      },
      statusCode: 200,
      message: 'Find User Team List',
    }),
  },
  inviteUser: {
    200: createMessageResponse({
      statusCode: 200,
      message: 'Invite User',
    }),
    404: createErrorResponse({
      statusCode: 404,
      message: 'Not Found Team',
      error: 'NOT FOUND',
    }),
  },
  deleteUser: {
    200: createMessageResponse({
      statusCode: 200,
      message: 'Delete User',
    }),
    404: createErrorResponse({
      statusCode: 404,
      message: 'Not Found User',
      error: 'NOT FOUND',
    }),
  },
  updateTeamUserRole: {
    200: createMessageResponse({
      statusCode: 200,
      message: 'Update Team User Role',
    }),
    404: createErrorResponse({
      statusCode: 404,
      message: 'Not Found Team User',
      error: 'NOT FOUND',
    }),
  },
  findTeamUserList: {
    200: createResponse({
      data: {
        data: [
          {
            id: 1,
            role: 'ADMIN',
            user: {
              id: 1,
              email: 'admin',
              nickname: 'Pinomaker',
            },
          },
        ],
        count: 1,
      },
      statusCode: 200,
      message: 'Find Team User List',
    }),
  },
};
