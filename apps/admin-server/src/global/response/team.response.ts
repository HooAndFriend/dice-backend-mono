import {
  createErrorResponse,
  createMessageResponse,
  createResponse,
} from './common';

export const TeamResponse = {
  findTeamList: {
    200: createResponse({
      data: {
        data: [
          [
            {
              id: 11,
              name: 'Rubber',
              description: '',
              createdid: '85h85@naver.com',
              createdDate: '2024-04-15T07:41:40.569Z',
              teamUserCount: 2,
              workspaceCount: 1,
            },
            {
              id: 12,
              name: '가인',
              description: '',
              createdid: 'dlrkdls997@naver.com',
              createdDate: '2024-04-17T13:44:01.200Z',
              teamUserCount: 0,
              workspaceCount: 1,
            },
          ],
          12,
        ],
        count: 2,
      },
      statusCode: 200,
      message: '팀 리스트를 조회합니다.',
    }),
  },
  findWorkspaceListByTeamId: {
    200: createResponse({
      data: {
        data: [
          {
            createdDate: '2024-02-14T00:57:33.346Z',
            id: 1,
            name: 'Pinomaker',
            createdId: '',
          },
        ],
        count: 1,
      },
      statusCode: 200,
      message: '팀의 워크스페이스 리스트를 조회합니다.',
    }),
  },
  findTeam: {
    200: createResponse({
      data: {
        createdDate: '2024-02-14T00:57:33.299Z',
        id: 1,
        name: 'Pinomaker',
        createdId: '',
        description: '',
      },
      statusCode: 200,
      message: '팀을 조회합니다.',
    }),
    404: createErrorResponse({
      statusCode: 404,
      message: 'Not Found Team',
      error: 'NOT FOUND',
    }),
  },
};
