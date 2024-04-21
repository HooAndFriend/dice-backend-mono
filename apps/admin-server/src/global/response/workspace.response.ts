import { createErrorResponse, createResponse } from './common';

export const WorkspaceResponse = {
  findWorkspaceList: {
    200: createResponse({
      data: {
        data: [
          {
            workspace_created_date: '2024-02-14T00:57:33.346Z',
            workspace_id: 1,
            workspace_name: 'Pinomaker',
            workspace_comment: '',
            workspace_createdId: '',
            workspaceUserCount: '1',
          },
          {
            workspace_created_date: '2024-02-14T00:57:36.010Z',
            workspace_id: 2,
            workspace_name: 'Pinomaker',
            workspace_comment: '',
            workspace_createdId: '',
            workspaceUserCount: '1',
          },
          {
            workspace_created_date: '2024-02-14T00:57:39.562Z',
            workspace_id: 3,
            workspace_name: 'Pinomaker',
            workspace_comment: '',
            workspace_createdId: '',
            workspaceUserCount: '1',
          },
          {
            workspace_created_date: '2024-02-14T00:57:42.678Z',
            workspace_id: 4,
            workspace_name: 'Pinomaker',
            workspace_comment: '',
            workspace_createdId: '',
            workspaceUserCount: '1',
          },
          {
            workspace_created_date: '2024-02-14T00:57:44.366Z',
            workspace_id: 5,
            workspace_name: 'Pinomaker',
            workspace_comment: '',
            workspace_createdId: '',
            workspaceUserCount: '1',
          },
          {
            workspace_created_date: '2024-02-14T00:57:45.757Z',
            workspace_id: 6,
            workspace_name: 'Pinomaker',
            workspace_comment: '',
            workspace_createdId: '',
            workspaceUserCount: '1',
          },
          {
            workspace_created_date: '2024-02-14T00:57:47.375Z',
            workspace_id: 7,
            workspace_name: 'Pinomaker',
            workspace_comment: '',
            workspace_createdId: '',
            workspaceUserCount: '1',
          },
          {
            workspace_created_date: '2024-02-14T00:57:48.647Z',
            workspace_id: 8,
            workspace_name: 'Pinomaker',
            workspace_comment: '',
            workspace_createdId: '',
            workspaceUserCount: '1',
          },
          {
            workspace_created_date: '2024-02-14T00:57:50.314Z',
            workspace_id: 9,
            workspace_name: 'Pinomaker',
            workspace_comment: '',
            workspace_createdId: '',
            workspaceUserCount: '1',
          },
          {
            workspace_created_date: '2024-02-14T00:57:51.738Z',
            workspace_id: 10,
            workspace_name: 'Pinomaker',
            workspace_comment: '',
            workspace_createdId: '',
            workspaceUserCount: '1',
          },
          {
            workspace_created_date: '2024-02-14T00:57:53.153Z',
            workspace_id: 11,
            workspace_name: 'Pinomaker',
            workspace_comment: '',
            workspace_createdId: '',
            workspaceUserCount: '1',
          },
        ],
        count: 11,
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
