import { createErrorResponse, createResponse } from './common';

export const WorkspaceResponse = {
  findWorkspaceList: {
    200: createResponse({
      data: {
        data: [
          [
            {
              id: 11,
              name: 'ryudain',
              comment: '',
              createdId: 'dkdlsekdls@naver.com',
              createdDate: '2024-04-04T15:06:15.907Z',
              workspaceUserCount: 1,
            },
            {
              id: 12,
              name: '이화진',
              comment: '',
              createdId: '와쿠와쿠',
              createdDate: '2024-04-14T15:17:22.446Z',
              workspaceUserCount: 1,
            },
            {
              id: 13,
              name: 'Rubber',
              comment: '',
              createdId: '85h85@naver.com',
              createdDate: '2024-04-15T07:41:40.595Z',
              workspaceUserCount: 1,
            },
            {
              id: 14,
              name: '가인',
              comment: '',
              createdId: 'dlrkdls997@naver.com',
              createdDate: '2024-04-17T13:44:01.225Z',
              workspaceUserCount: 1,
            },
          ],
          14,
        ],
        count: 2,
      },
      statusCode: 200,
      message: '워크스페이스 리스트를 조회합니다.',
    }),
  },

  findWorkspace: {
    200: createResponse({
      data: {
        id: 3,
        name: 'HooAndFriend',
        profile: 'https://file.hi-dice.com/dice-dev/logo.png',
        comment: '인후와 친구들',
        createdId: 'admin',
        createdDate: '2024-04-01T06:33:20.111Z',
        userCount: 9,
      },
      statusCode: 200,
      message: '워크스페이스를 조회합니다.',
    }),
    404: createErrorResponse({
      statusCode: 404,
      error: 'NOT FOUND',
      message: 'Not Found Workspace',
    }),
  },
};
