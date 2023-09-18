import {
  createErrorResponse,
  createMessageResponse,
  createSuccessResponse,
} from './common';

export const WorkspaceResponse = {
  saveWorksapce: {
    200: createMessageResponse({
      statusCode: 200,
      message: '워크스페이스를 생성합니다.',
    }),
    400: createErrorResponse({
      statusCode: 400,
      message: '같은 이름의 워크스페이스가 있습니다.',
      error: 'BAD REQUEST',
    }),
  },
  updateWorkspace: {
    200: createMessageResponse({
      statusCode: 200,
      message: '워크스페이스를 수정합니다.',
    }),
    404: createErrorResponse({
      statusCode: 404,
      message: '워크스페이스를 찾을 수 없습니다.',
      error: 'NOT FOUND',
    }),
  },
  findWorkspace: {
    200: createSuccessResponse({
      data: {
        id: 1,
        name: 'HooAndFriend@@@',
        comment: '이 워크스페이스는..@@@',
        profile: 'http://localhost:3000',
        isPersonal: true,
        workspaceUser: [
          {
            role: 'OWNER',
            user: {
              nickname: '피노피노얍',
              email: 'inhoo987654321@gmail.com',
              profile: 'http://loasdasd.com',
            },
          },
        ],
      },
      statusCode: 200,
      message: '워크스페이스 정보를 조회합니다.',
    }),
    404: createErrorResponse({
      statusCode: 404,
      message: '워크스페이스를 찾을 수 없습니다.',
      error: 'NOT FOUND',
    }),
  },
};
