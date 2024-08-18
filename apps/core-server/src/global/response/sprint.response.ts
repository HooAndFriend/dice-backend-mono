import {
  createErrorResponse,
  createMessageResponse,
  createPaginationResponse,
  createResponse,
} from './common';

export const SprintResponse = {
  saveSprint: {
    200: createMessageResponse({
      statusCode: 200,
      message: 'Sprint를 생성합니다.',
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
      message: 'Not Found Sprint',
    }),
  },

  findSprint: {
    200: createResponse({
      data: {
        name: '스프린트1',
        startDate: '2024-08-08',
        endDate: '2024-08-22',
        description: 'no description',
      },
      statusCode: 200,
      message: 'Sprint를 조회합니다.',
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

  saveSprintToTicket: {
    200: createMessageResponse({
      statusCode: 200,
      message: 'Sprint에 티켓을 추가합니다.',
    }),
  },

  findSprintList: {
    200: createResponse({
      statusCode: 200,
      message: '스프린트 리스트를 조회합니다.',
      data: [
        [
          {
            title: '',
            startDate: null,
            endDate: null,
            ticket: [],
          },
          {
            title: '',
            startDate: null,
            endDate: null,
            ticket: [
              {
                ticketId: 1,
                name: '티켓',
                status: 'NOTHING',
                dueDate: null,
              },
              {
                ticketId: 2,
                name: '123123',
                status: 'DOING',
                dueDate: null,
              },
              {
                ticketId: 3,
                name: '122',
                status: 'WAITING',
                dueDate: null,
              },
            ],
          },
          {
            title: '',
            startDate: null,
            endDate: null,
            ticket: [],
          },
          {
            title: '',
            startDate: null,
            endDate: null,
            ticket: [],
          },
          {
            title: '',
            startDate: null,
            endDate: null,
            ticket: [],
          },
          {
            title: '',
            startDate: null,
            endDate: null,
            ticket: [],
          },
          {
            title: '',
            startDate: null,
            endDate: null,
            ticket: [],
          },
          {
            title: '',
            startDate: null,
            endDate: null,
            ticket: [],
          },
        ],
        8,
      ],
    }),
  },

  deleteTicketInSprint: {
    200: createMessageResponse({
      statusCode: 200,
      message: '하위 티켓을 삭제합니다.',
    }),
    404: createErrorResponse({
      statusCode: 404,
      error: 'NOT FOUND',
      message: 'Sprint 정보를 찾을 수 없습니다.',
    }),
  },

  updateSprintState: {
    200: createMessageResponse({
      statusCode: 200,
      message: 'Sprint를 상태를 변경합니다.',
    }),
    404: createErrorResponse({
      statusCode: 404,
      error: 'NOT FOUND',
      message: 'Not Found Sprint',
    }),
  },
};
