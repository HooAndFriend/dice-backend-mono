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
  },
  findAllTable: {
    200: createResponse({
      data: [
        {
          id: 1,
          name: 'tbl_test',
          comment: '예시 테이블입니다.',
          create_user: 'pino',
          last_modify_user: 'jooman',
        },
      ],
      statusCode: 200,
      message: '테이블을 조회합니다.',
    }),
    400: createErrorResponse({
      statusCode: 404,
      error: 'BAD REQUEST',
      message: '테이블 정보를 찾을수 없습니다.',
    }),
  },
  deleteTable: {
    200: createMessageResponse({
      statusCode: 200,
      message: '테이블을 수정합니다.',
    }),
    400: createErrorResponse({
      statusCode: 404,
      error: 'BAD REQUEST',
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
  },
  findAllColumn: {
    200: createResponse({
      data: [
        {
          id: 1,
          key: 'PK',
          column: 'test_column',
          isnull: 'N-N',
          data_type: 'integer',
          option: 'auto_increment',
          comment: '예시 컬럼입니다.',
          create_user: 'pino',
          last_modify_user: 'jooman',
        },
      ],
      statusCode: 200,
      message: '컬럼을 조회합니다.',
    }),
    400: createErrorResponse({
      statusCode: 404,
      error: 'BAD REQUEST',
      message: '컬럼 정보를 찾을수 없습니다.',
    }),
  },
  deleteColumn: {
    200: createMessageResponse({
      statusCode: 200,
      message: '컬럼을 수정합니다.',
    }),
    400: createErrorResponse({
      statusCode: 404,
      error: 'BAD REQUEST',
      message: '컬럼 정보를 찾을수 없습니다',
    }),
  },
};
