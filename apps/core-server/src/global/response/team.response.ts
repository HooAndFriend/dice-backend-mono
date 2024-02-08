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
  updateTeam: {
    200: createMessageResponse({
      statusCode: 200,
      message: '팀을 생성합니다.',
    }),
    400: createErrorResponse({
      statusCode: 400,
      message: '같은 이름의 팀이 있습니다.',
      error: 'BAD REQUEST',
    }),
    404: createErrorResponse({
      statusCode: 404,
      message: 'Not Found Team',
      error: 'NOT FOUND',
    }),
  },
  findTeam: {
    200: createResponse({
      data: {
        id: 1,
        name: 'HooAndFriend',
        profile:
          'https://firebasestorage.googleapis.com/v0/b/dice-dev-a5b63.appspot.com/o/images%2FIMG_6159.jpg?alt=media&token=450c0181-8826-4856-b611-509712872450',
        uuid: '9340973d-f19d-470c-a4bc-782cda89f234',
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
