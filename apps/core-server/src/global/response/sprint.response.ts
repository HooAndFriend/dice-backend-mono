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
    statusCode: 200,
    message: '티켓 검색이 완료되었습니다.',
    data: [
      [
        {
          title: '우헤헿',
          startDate: '2024-08-11',
          endDate: '2024-08-25',
          ticket: [
            {
              ticketId: 6,
              name: '122',
              status: 'NOTHING',
              dueDate: null,
            },
            {
              ticketId: 5,
              name: '122',
              status: 'NOTHING',
              dueDate: null,
            },
            {
              ticketId: 4,
              name: '게시판',
              status: 'NOTHING',
              dueDate: null,
            },
          ],
        },
      ],
    ],
  },
};
