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
  findWorksapceCalendarTaskCount: {
    200: createResponse({
      data: {
        data: [
          {
            createdDate: '2024-03-31T07:46:33.453Z',
            id: 3,
            name: '감자탕123123',
            dueDate: '2024-04-06',
            type: 'ticket',
          },
          {
            id: 3,
            name: 'Team 생성 시에 Workspace Function 미생성',
            dueDate: '2024-04-06',
            type: 'QA',
            createdDate: '2024-04-01T07:30:46.563Z',
          },
          {
            id: 4,
            name: 'Team 생성 시에 Workspace Function 미생성',
            dueDate: '2024-04-06',
            type: 'QA',
            createdDate: '2024-04-01T07:30:46.585Z',
          },
          {
            id: 7,
            name: 'Qa에서 Worker 변경 시 Qa Card에서는 변동 없음',
            dueDate: '2024-04-06',
            type: 'QA',
            createdDate: '2024-04-01T07:32:57.757Z',
          },
          {
            id: 8,
            name: 'Qa에서 Worker 변경 시 Qa Card에서는 변동 없음',
            dueDate: '2024-04-06',
            type: 'QA',
            createdDate: '2024-04-01T07:32:57.766Z',
          },
          {
            id: 10,
            name: 'QA 페이지에서 Team 변경해도 Qa가 옛날 걸로 나옴',
            dueDate: '2024-04-06',
            type: 'QA',
            createdDate: '2024-04-01T08:09:15.730Z',
          },
          {
            id: 11,
            name: 'QA 페이지에서 Team 변경해도 Qa가 옛날 걸로 나옴',
            dueDate: '2024-04-06',
            type: 'QA',
            createdDate: '2024-04-01T08:09:15.733Z',
          },
          {
            id: 12,
            name: '2번 테스트',
            dueDate: '2024-04-06',
            type: 'QA',
            createdDate: '2024-04-01T08:09:25.239Z',
          },
          {
            id: 13,
            name: '2번 테스트',
            dueDate: '2024-04-06',
            type: 'QA',
            createdDate: '2024-04-01T08:09:25.242Z',
          },
          {
            id: 14,
            name: 'Qa 삭제해도 리스트에 노출되는 케이스 있음',
            dueDate: '2024-04-06',
            type: 'QA',
            createdDate: '2024-04-01T08:10:10.088Z',
          },
          {
            id: 15,
            name: 'Qa 삭제해도 리스트에 노출되는 케이스 있음',
            dueDate: '2024-04-06',
            type: 'QA',
            createdDate: '2024-04-01T08:10:10.090Z',
          },
          {
            id: 16,
            name: '유저 프로필 변경 안 됨',
            dueDate: '2024-04-06',
            type: 'QA',
            createdDate: '2024-04-01T08:10:57.105Z',
          },
          {
            id: 17,
            name: '유저 프로필 변경 안 됨',
            dueDate: '2024-04-06',
            type: 'QA',
            createdDate: '2024-04-01T08:10:57.108Z',
          },
          {
            id: 18,
            name: '팀에 유저 초대 시에 유저 리스트 바로 갱신 안 됨.',
            dueDate: '2024-04-06',
            type: 'QA',
            createdDate: '2024-04-01T08:54:29.878Z',
          },
          {
            id: 19,
            name: '현재 보고 있는 Qa는 노출이 되면 좋겠음',
            dueDate: '2024-04-06',
            type: 'QA',
            createdDate: '2024-04-01T08:59:30.162Z',
          },
          {
            id: 31,
            name: 'Sample',
            dueDate: '2024-04-06',
            type: 'QA',
            createdDate: '2024-04-01T11:30:13.106Z',
          },
        ],
        count: 16,
      },
      statusCode: 200,
      message: 'Find Workspace Total Done Task Count',
    }),
  },
  findWorksapceTaskProgressCount: {
    200: createResponse({
      data: {
        todayProgress: 39.130434782608695,
        yesterdayProgress: 10.526315789473683,
      },
      statusCode: 200,
      message: 'Find Workspace Today Task Progress',
    }),
  },
  findWorksapceTaskList: {
    200: createResponse({
      data: {
        data: [
          {
            createdDate: '2024-03-31T07:20:15.910Z',
            id: 1,
            code: '',
            status: 'DOING',
            title: '@@@@',
          },
          {
            createdDate: '2024-04-01T01:23:49.492Z',
            id: 2,
            code: 'ADM-2',
            status: 'DONE',
            title: '나는 배가 고프다!',
          },
          {
            createdDate: '2024-04-01T07:32:57.757Z',
            id: 7,
            code: 'HAF-5',
            status: 'COMPLETE',
            title: 'Qa에서 Worker 변경 시 Qa Card에서는 변동 없음',
          },
          {
            createdDate: '2024-04-01T08:09:15.730Z',
            id: 10,
            code: 'HAF-8',
            status: 'REOPEN',
            title: 'QA 페이지에서 Team 변경해도 Qa가 옛날 걸로 나옴',
          },
          {
            createdDate: '2024-04-01T08:10:10.088Z',
            id: 14,
            code: 'HAF-12',
            status: 'COMPLETE',
            title: 'Qa 삭제해도 리스트에 노출되는 케이스 있음',
          },
          {
            createdDate: '2024-04-01T08:10:57.105Z',
            id: 16,
            code: 'HAF-14',
            status: 'COMPLETE',
            title: '유저 프로필 변경 안 됨',
          },
          {
            createdDate: '2024-04-01T08:54:29.878Z',
            id: 18,
            code: 'HAF-16',
            status: 'COMPLETE',
            title: '팀에 유저 초대 시에 유저 리스트 바로 갱신 안 됨.',
          },
          {
            createdDate: '2024-04-01T08:59:30.162Z',
            id: 19,
            code: 'HAF-17',
            status: 'COMPLETE',
            title: '현재 보고 있는 Qa는 노출이 되면 좋겠음',
          },
          {
            createdDate: '2024-04-01T11:21:32.826Z',
            id: 20,
            code: 'ADM-3',
            status: 'WAITING',
            title: '123123',
          },
          {
            createdDate: '2024-04-01T11:21:35.850Z',
            id: 21,
            code: 'ADM-4',
            status: 'NOTHING',
            title: '123123',
          },
          {
            createdDate: '2024-04-01T11:21:35.985Z',
            id: 22,
            code: 'ADM-5',
            status: 'NOTHING',
            title: '123123',
          },
          {
            createdDate: '2024-04-01T11:23:12.985Z',
            id: 23,
            code: 'ADM-6',
            status: 'NOTHING',
            title: '123123123',
          },
          {
            createdDate: '2024-04-01T11:23:17.170Z',
            id: 24,
            code: 'ADM-7',
            status: 'NOTHING',
            title: '1231211111',
          },
          {
            createdDate: '2024-04-01T11:23:17.252Z',
            id: 25,
            code: 'ADM-8',
            status: 'NOTHING',
            title: '1231211111',
          },
          {
            createdDate: '2024-04-01T11:24:19.868Z',
            id: 26,
            code: 'ADM-9',
            status: 'NOTHING',
            title: '12312',
          },
          {
            createdDate: '2024-04-01T11:24:24.056Z',
            id: 27,
            code: 'ADM-10',
            status: 'NOTHING',
            title: '12121',
          },
          {
            createdDate: '2024-04-01T11:24:24.197Z',
            id: 28,
            code: 'ADM-11',
            status: 'NOTHING',
            title: '12121',
          },
          {
            createdDate: '2024-04-01T11:25:27.573Z',
            id: 29,
            code: 'ADM-12',
            status: 'NOTHING',
            title: 'Sample',
          },
          {
            createdDate: '2024-04-01T11:25:34.051Z',
            id: 30,
            code: 'ADM-13',
            status: 'NOTHING',
            title: 'Samasd',
          },
          {
            createdDate: '2024-04-04T15:07:49.913Z',
            id: 33,
            code: 'ADM-14',
            status: 'NOTHING',
            title: '하이하잉',
          },
          {
            createdDate: '2024-04-04T15:07:54.504Z',
            id: 34,
            code: 'ADM-15',
            status: 'NOTHING',
            title: '나도 배고파',
          },
          {
            id: 1,
            code: 'ADM-1',
            status: 'DOING',
            title: '감자탕',
            createdDate: '2024-03-31T07:46:33.453Z',
          },
          {
            id: 3,
            code: 'ADM-1',
            status: 'COMPLETE',
            title: '감자탕123123',
            createdDate: '2024-03-31T07:46:33.453Z',
          },
          {
            id: 5,
            code: 'ADM-2',
            status: 'WAITING',
            title: '감자탕',
            createdDate: '2024-04-03T17:41:41.922Z',
          },
          {
            id: 6,
            code: 'ADM-3',
            status: 'DONE',
            title: '감자탕',
            createdDate: '2024-04-03T17:51:28.912Z',
          },
        ],
        count: 25,
      },
      statusCode: 200,
      message: 'Find Workspace Task List',
    }),
  },
  findWorksapceTaskCount: {
    200: createResponse({
      data: {
        count: 0,
        yesterdayCount: 0,
      },
      statusCode: 200,
      message: 'Find Workspace Info',
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
