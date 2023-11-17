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
    400: createErrorResponse({
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
    400: createErrorResponse({
      statusCode: 404,
      error: 'NOT FOUND',
      message: '컬럼 정보를 찾을수 없습니다',
    }),
  },
  findErd: {
    200: createResponse({
      data: [
        {
          table: {
            id: 1,
            name: 'tbl_test',
            comment: '예시 테이블입니다.',
            create_user: {
              nickname: 'pino',
              email: 'pino@gamil.com',
              profile:
                'https://firebasestorage.googleapis.com/v0/b/dice-dev-a5b63.appspot.com/o/images%2F%',
            },
            modify_user: {
              nickname: 'jooman',
              email: 'joo@gamil.com',
              profile:
                'https://firebasestorage.googleapis.com/v0/b/dice-dev-a5b63.appspot.com/o/images%2F%',
            },
          },
          column: [
            {
              id: 1,
              table: {
                id: 1,
              },
              key: 'PK',
              name: 'test_column',
              isnull: 'N-N',
              data_type: 'integer',
              option: 'auto_increment',
              comment: '예시 컬럼입니다.',
              create_user: {
                nickname: 'pino',
                email: 'pino@gamil.com',
                profile:
                  'https://firebasestorage.googleapis.com/v0/b/dice-dev-a5b63.appspot.com/o/images%2F%',
              },
              modify_user: {
                nickname: 'jooman',
                email: 'joo@gamil.com',
                profile:
                  'https://firebasestorage.googleapis.com/v0/b/dice-dev-a5b63.appspot.com/o/images%2F%',
              },
            },
          ],
        },
      ],
      statusCode: 200,
      message: 'erd을 조회합니다.',
    }),
    400: createErrorResponse({
      statusCode: 404,
      error: 'NOT FOUND',
      message: 'erd 정보를 찾을수 없습니다.',
    }),
  },
};
