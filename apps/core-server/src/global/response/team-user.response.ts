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
              id: 1,
              name: 'HooAndFriend@@@@@',
              profile: '이 워크스페이스는..',
              uuid: '9340973d-f19d-470c-a4bc-782cda89f234',
            },
          },
          {
            id: 3,
            role: 'ADMIN',
            team: {
              id: 2,
              name: 'Aiaracorp@',
              profile: '이 워크스페이스는..',
              uuid: 'cfa3b284-a000-4b09-a06f-1794cdb0a22e',
            },
          },
        ],
        count: 2,
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
              nickname: 'admin@@',
              profile:
                'https://firebasestorage.googleapis.com/v0/b/dice-dev-a5b63.appspot.com/o/images%2FIMG_6159.jpg?alt=media&token=450c0181-8826-4856-b611-509712872450',
            },
          },
          {
            id: 2,
            role: 'VIEWER',
            user: {
              id: 2,
              email: 'dddd',
              nickname: 'Pinomaker',
              profile:
                'https://firebasestorage.googleapis.com/v0/b/dice-dev-a5b63.appspot.com/o/images%2FIMG_6159.jpg?alt=media&token=450c0181-8826-4856-b611-509712872450',
            },
          },
        ],
        count: 2,
      },
      statusCode: 200,
      message: 'Find Team User List',
    }),
  },
};
