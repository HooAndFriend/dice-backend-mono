import {
  createErrorResponse,
  createMessageResponse,
  createSuccessResponse,
} from './common';

export const WorkspaceUserResponse = {
  findWorkspaceList: {
    200: createSuccessResponse({
      data: {
        data: [
          {
            role: 'OWNER',
            workspace: {
              id: 1,
              name: 'Pinomaker',
              profile: null,
              isPersonal: false,
            },
          },
        ],
        count: 1,
      },
      statusCode: 200,
      message: '워크스페이스를 조회합니다.',
    }),
  },
};
