import { count } from 'console';
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
  saveSprintToTicket: {
    200: createMessageResponse({
      statusCode: 200,
      message: 'Sprint에 티켓을 추가합니다.',
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
      },
      statusCode: 200,
      message: 'Sprint를 조회합니다.',
    }),
  },
  findSprintList: {
    200: createResponse({
      data: {
        data: [
          {
            id: 1,
            name: '스프린트1',
            startDate: '2021-01-01',
            endDate: '2021-01-31',
            orderId: 1,
            ticket: [
              {
                createdDate: '2024-04-14T11:03:27.788Z',
                modifiedDate: '2024-05-04T15:42:30.826Z',
                id: 1,
                name: '티켓1',
                status: 'DONE',
                content: null,
                code: 'DWW-1',
                storypoint: null,
                dueDate: null,
                completeDate: null,
                reopenDate: null,
              },
            ],
          },
        ],
        count: 1,
      },
      statusCode: 200,
      message: 'Sprint 리스트를 조회합니다.',
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
  deleteTicketToSprint: {
    200: createMessageResponse({
      statusCode: 200,
      message: 'Sprint에서 티켓을 삭제합니다.',
    }),
    404: createErrorResponse({
      statusCode: 404,
      error: 'NOT FOUND',
      message: 'Sprint 정보를 찾을 수 없습니다.',
    }),
  },
};
