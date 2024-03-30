import {
  createErrorResponse,
  createMessageResponse,
  createResponse,
} from './common';

export const UserResponse = {
  findUserList: {
    200: createResponse({
      data: {
        data: [
          {
            id: 1,
            email: 'admin',
            nickname: 'Pinomaker',
            type: 'DICE',
            createdDate: '2024-03-11T14:48:02.429Z',
            lastLoginDate: '2024-03-29T05:47:10.000Z',
            teamUserCount: 6,
            workspaceUserCount: 10,
          },
        ],
        count: 1,
      },
      statusCode: 200,
      message: '유저 리스트를 조회합니다.',
    }),
  },
  findUser: {
    200: createResponse({
      data: {
        createdDate: '2024-02-14T00:57:33.265Z',
        id: 1,
        email: 'admin',
        type: 'DICE',
        nickname: 'Pinomaker',
        lastLoginDate: '2024-02-14T00:57:33.000Z',
      },
      statusCode: 200,
      message: '유저를 조회합니다.',
    }),
    404: createErrorResponse({
      statusCode: 404,
      message: 'Not Found User',
      error: 'NOT FOUND',
    }),
  },
  findTeamUserList: {
    200: createResponse({
      data: {
        data: [
          {
            createdDate: '2024-02-14T00:57:33.322Z',
            id: 1,
            role: 'ADMIN',
            invitedId: 'admin',
            team: {
              name: 'Pinomaker',
            },
          },
        ],
        count: 1,
      },
      statusCode: 200,
      message: '유저의 팀 리스트를 조회합니다.',
    }),
  },
  findWorksapceUserList: {
    200: createResponse({
      data: {
        data: [
          {
            createdDate: '2024-02-14T00:57:33.382Z',
            id: 1,
            role: 'ADMIN',
            invitedId: 'admin',
            workspace: {
              name: 'Pinomaker',
            },
          },
        ],
        count: 1,
      },
      statusCode: 200,
      message: '유저의 워크스페이스 리스트를 조회합니다.',
    }),
  },
};
