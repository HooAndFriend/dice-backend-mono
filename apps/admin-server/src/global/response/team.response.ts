import {
  createErrorResponse,
  createMessageResponse,
  createPaginationResponse,
  createResponse,
} from './common';

export const TeamResponse = {
  saveTeam: {
    200: createMessageResponse({
      statusCode: 200,
      message: '팀을 생성합니다.',
    }),
    400: createErrorResponse({
      statusCode: 400,
      message: '같은 이름의 팀이 있습니다.',
      error: 'BAD REQUEST',
    }),
  },
  findTeam: {
    200: createResponse({
      data: {
        id: 1,
        name: 'HooAndFriend',
        profile: '이 워크스페이스는..',
        description: '이 워크스페이스는..',
      },
      statusCode: 200,
      message: 'Find Team',
    }),
    404: createErrorResponse({
      statusCode: 404,
      message: 'Not Found Team',
      error: 'NOT FOUND',
    }),
  },
};
