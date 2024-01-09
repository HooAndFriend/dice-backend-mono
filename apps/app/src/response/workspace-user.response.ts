import {
  createErrorResponse,
  createMessageResponse,
  createPaginationResponse,
} from './common';

export const WorkspaceUserResponse = {
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
  saveWorkspaceUser: {
    200: createMessageResponse({
      statusCode: 200,
      message: 'Invite Workspace User',
    }),
    404: createErrorResponse({
      statusCode: 404,
      message: 'Not Found Workspace',
      error: 'NOT FOUND',
    }),
  },
};
