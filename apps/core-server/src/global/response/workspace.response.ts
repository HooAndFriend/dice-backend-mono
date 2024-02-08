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
    200: createResponse({
      data: {
        data: [
          {
            id: 1,
            name: 'admin',
            comment: '',
            profile:
              'https://firebasestorage.googleapis.com/v0/b/dice-dev-a5b63.appspot.com/o/images%2FIMG_6159.jpg?alt=media&token=450c0181-8826-4856-b611-509712872450',
            uuid: '05699c8c-de14-4d3d-b745-e67a40e39ac0',
            workspaceFunction: [
              {
                id: 2,
                function: 'QA',
              },
              {
                id: 1,
                function: 'TICKET',
              },
            ],
          },
        ],
        count: 1,
      },
      statusCode: 200,
      message: 'Find Workspace List',
    }),
  },
  findWorkspaceListWithCount: {
    200: createResponse({
      data: {
        data: [
          {
            workspace_id: 2,
            workspace_name: 'HooAndFriend',
            workspace_comment: '이 워크스페이스는..',
            workspace_profile:
              'https://firebasestorage.googleapis.com/v0/b/dice-dev-a5b63.appspot.com/o/images%2FIMG_6159.jpg?alt=media&token=450c0181-8826-4856-b611-509712872450',
            workspace_uuid: 'a4a6ab31-86fd-4560-80c5-45dcb45e9775',
            workspaceUserCount: '1',
          },
          {
            workspace_id: 3,
            workspace_name: 'HooAndFriend',
            workspace_comment: '이 워크스페이스는..',
            workspace_profile:
              'https://firebasestorage.googleapis.com/v0/b/dice-dev-a5b63.appspot.com/o/images%2FIMG_6159.jpg?alt=media&token=450c0181-8826-4856-b611-509712872450',
            workspace_uuid: '8d873b0e-9c86-498a-b36f-8e9eb712bbcb',
            workspaceUserCount: '2',
          },
        ],
        count: 2,
      },
      statusCode: 200,
      message: 'Find Workspace List',
    }),
  },
};
