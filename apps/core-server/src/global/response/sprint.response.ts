import {
  createErrorResponse,
  createMessageResponse,
  createResponse,
  createPaginationResponse,
} from './common';
export const SprintResponse = {
  saveSprint: {
    200: createMessageResponse({
      statusCode: 200,
      message: 'Sprint를 생성합니다.',
    }),
  },
  findSprint: {
    200: createResponse({
      data: {
        id: 1,
        name: '스프린트1',
        startDate: '2021-01-01',
        endDate: '2021-01-31',
        orderId: 1,
        tickets: [
          {
            createdDate: '2024-04-14T11:03:27.788Z',
            modifiedDate: '2024-05-04T14:17:08.000Z',
            id: 1,
            name: '티켓1',
            orderId: 1,
            status: 'DONE',
            content: null,
            code: 'HWA-1',
            storypoint: null,
            isDeleted: false,
            dueDate: null,
            completeDate: null,
            reopenDate: null,
          },
        ],
      },
      statusCode: 200,
      message: 'Sprint를 조회합니다.',
    }),
  },
  updateSprint: {
    200: createMessageResponse({
      statusCode: 200,
      message: 'Sprint를 수정합니다.',
    }),
    404: createErrorResponse({
      statusCode: 404,
      error: 'NOT FOUND',
      message: 'Sprint 정보를 찾을 수 없습니다.',
    }),
  },
  deleteSprint: {
    200: createMessageResponse({
      statusCode: 200,
      message: 'Sprint를 삭제합니다.',
    }),
    404: createErrorResponse({
      statusCode: 404,
      error: 'NOT FOUND',
      message: 'Sprint 정보를 찾을 수 없습니다.',
    }),
  },
};
