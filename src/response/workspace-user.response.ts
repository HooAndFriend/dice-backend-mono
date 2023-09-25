import {
  createErrorResponse,
  createMessageResponse,
  createPaginationResponse,
} from './common';

export const WorkspaceUserResponse = {
  findWorkspaceList: {
    200: createPaginationResponse({
      data: [
        {
          id: 1,
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
      statusCode: 200,
      message: '워크스페이스를 조회합니다.',
    }),
  },
  updateWorkspaceRole: {
    200: createMessageResponse({
      statusCode: 200,
      message: '워크스페이스에서 유저의 권한을 수정합니다.',
    }),
    404: createErrorResponse({
      statusCode: 404,
      message: '워크스페이스에서 유저의 정보를 찾을 수 없습니다.',
      error: 'NOT FOUND',
    }),
  },
};
