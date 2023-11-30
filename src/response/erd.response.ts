import {
  createErrorResponse,
  createResponse,
  createMessageResponse,
} from './common';
export const ErdResponse = {
  saveTable: {
    200: createMessageResponse({
      statusCode: 200,
      message: '테이블을 생성합니다.',
    }),
    400: createErrorResponse({
      statusCode: 400,
      error: 'BAD REQUEST',
      message: '이미 사용 중인 테이블 입니다.',
    }),
  },
  updateTable: {
    200: createMessageResponse({
      statusCode: 200,
      message: '테이블을 수정합니다.',
    }),
    400: createErrorResponse({
      statusCode: 400,
      error: 'BAD REQUEST',
      message: '이미 사용 중인 테이블 입니다.',
    }),
    404: createErrorResponse({
      statusCode: 404,
      error: 'NOT FOUND',
      message: '테이블을 찾을 수 없습니다.',
    }),
  },
  deleteTable: {
    200: createMessageResponse({
      statusCode: 200,
      message: '테이블을 수정합니다.',
    }),
    404: createErrorResponse({
      statusCode: 404,
      error: 'NOT FOUND',
      message: '테이블 정보를 찾을수 없습니다',
    }),
  },
  saveColumn: {
    200: createMessageResponse({
      statusCode: 200,
      message: '컬럼을 생성합니다.',
    }),
    400: createErrorResponse({
      statusCode: 400,
      error: 'BAD REQUEST',
      message: '이미 사용 중인 컬럼 입니다.',
    }),
  },
  updateColumn: {
    200: createMessageResponse({
      statusCode: 200,
      message: '컬럼을 수정합니다.',
    }),
    400: createErrorResponse({
      statusCode: 400,
      error: 'BAD REQUEST',
      message: '이미 사용 중인 컬럼 입니다.',
    }),
    404: createErrorResponse({
      statusCode: 404,
      error: 'NOT FOUND',
      message: '컬럼을 찾을 수 없습니다.',
    }),
  },
  deleteColumn: {
    200: createMessageResponse({
      statusCode: 200,
      message: '컬럼을 수정합니다.',
    }),
    404: createErrorResponse({
      statusCode: 404,
      error: 'NOT FOUND',
      message: '컬럼 정보를 찾을수 없습니다',
    }),
  },
  findErd: {
    200: createResponse({
      data: [
        {
          id: 7,
          name: 'tbl_test',
          comment: '예시 테이블',
          column: [
            {
              id: 1,
              key: 'PK',
              name: 'test',
              isNull: 'N-N',
              dataType: 'integer',
              option: null,
              comment: null,
              createUser: {
                nickname: 'zhco',
                email: 'zhco9413@gmail.com',
                profile:
                  'https://firebasestorage.googleapis.com/v0/b/dice-dev-a5b63.appspot.com/o/images%2Fmusic2.jpg?alt=media&token=2df4dea2-b822-40c9-b751-244bdacf1db7',
              },
              modifyUser: {
                nickname: 'zhco',
                email: 'zhco9413@gmail.com',
                profile:
                  'https://firebasestorage.googleapis.com/v0/b/dice-dev-a5b63.appspot.com/o/images%2Fmusic2.jpg?alt=media&token=2df4dea2-b822-40c9-b751-244bdacf1db7',
              },
            },
          ],
          createUser: {
            nickname: 'jooman',
            email: '',
            profile: '',
          },
          modifyUser: {
            nickname: 'jooman',
            email: '',
            profile: '',
          },
        },
      ],
      statusCode: 200,
      message: 'ERD를 조회합니다.',
    }),
    404: createErrorResponse({
      statusCode: 404,
      error: 'NOT FOUND',
      message: 'ERD 정보를 찾을 수 없습니다.',
    }),
  },
  tableMapping: {
    200: createMessageResponse({
      statusCode: 200,
      message: '테이블을 매핑합니다.',
    }),
    404: createErrorResponse({
      statusCode: 404,
      error: 'NOT FOUND',
      message: '테이블 정보를 찾을 수 없습니다.',
    }),
  },
};
