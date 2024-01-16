import {
  createErrorResponse,
  createMessageResponse,
  createPaginationResponse,
  createResponse,
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
    200: createResponse({
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
  findWorkspaceMain: {
    200: createResponse({
      data: {
        id: 1,
        name: 'HooAndFriend@@@',
        comment: '이 워크스페이스는..@@@',
        profile:
          'https://firebasestorage.googleapis.com/v0/b/dice-dev-a5b63.appspot.com/o/images%2F%E1%84%85%E1%85%A9%E1%84%80%E1%85%A9.png?alt=media&token=da1aeee5-3cd9-4be1-a99c-80d80bee3f7c',
        isPersonal: true,
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
};
