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
  },
  updateTable: {
    200: createMessageResponse({
      statusCode: 200,
      message: '테이블을 수정합니다.',
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
  },
  updateColumn: {
    200: createMessageResponse({
      statusCode: 200,
      message: '컬럼을 수정합니다.',
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
      data: {
        findErd: [
          {
            id: 2,
            physicalName: '',
            logicalName: '',
            comment: '예시 테이블',
            column: [
              {
                id: 6,
                key: 'PK',
                logicalName: 'testPK',
                physicalName: 'testPK',
                isNull: 'N-N',
                dataType: 'integer',
                option: '',
                comment: '예시 PK',
                mapping: null,
              },
            ],
          },
          {
            id: 3,
            physicalName: '',
            logicalName: '',
            comment: '예시 테이블2',
            column: [
              {
                id: 7,
                key: 'FK',
                logicalName: 'undefined1',
                physicalName: 'undefined1',
                isNull: 'N-N',
                dataType: 'integer',
                option: '',
                comment: null,
                mapping: null,
              },
              {
                id: 8,
                key: 'FK',
                logicalName: 'testPK2',
                physicalName: 'testPK2',
                isNull: 'N-N',
                dataType: 'integer',
                option: '',
                comment: null,
                mapping: {
                  type: '1:N',
                  tableChild: {
                    id: 3,
                  },
                  tableParent: {
                    id: 2,
                  },
                },
              },
            ],
          },
        ],
        count: 2,
      },
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
