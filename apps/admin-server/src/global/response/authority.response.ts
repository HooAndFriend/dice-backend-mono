import {
  createErrorResponse,
  createMessageResponse,
  createResponse,
} from './common';

export const AuthorityResponse = {
  findAuthority: {
    200: createResponse({
      data: {
        authority: {
          createdDate: '2024-02-16T11:34:14.000Z',
          modifiedDate: '2024-02-16T11:44:44.852Z',
          id: 2,
          name: 'subAdmin',
          role: 'MASTER',
          dashboardYn: true,
          userYn: false,
          inactiveUserYn: true,
          teamYn: false,
          workspaceYn: true,
          qnaYn: true,
          faqYn: true,
          programYn: true,
          stateYn: true,
          adminYn: true,
        },
      },
      statusCode: 200,
      message: '관리자 권한을 조회했습니다.',
    }),
    404: createErrorResponse({
      statusCode: 404,
      message: '존재하지 않는 관리자입니다.',
      error: 'NOT FOUND',
    }),
  },
  updateAuthority: {
    200: createMessageResponse({
      statusCode: 200,
      message: '관리자 권한을 수정했습니다.',
    }),
    404: createErrorResponse({
      statusCode: 404,
      message: '존재하지 않는 관리자입니다.',
      error: 'NOT FOUND',
    }),
  },
};
