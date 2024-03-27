import { TicketStatus } from '../enum/ticket.enum';
import {
  createErrorResponse,
  createMessageResponse,
  createResponse,
} from './common';

export const TicketResponse = {
  findAllTicket: {
    200: createResponse({
      statusCode: 200,
      message: 'Ticket을 전체 조회합니다.',
      data: {
        data: [
          {
            id: 1,
            name: '상세보기 버튼',
            status: TicketStatus.Reopen,
            dueDate: '2024-01-20',
            completeDate: '2024-01-19',
            reopenDate: '2024-01-22',
            workspace: {
              id: 1,
            },
            worker: {
              id: 2,
              nickname: 'Pinomaker',
              profile:
                'https://firebasestorage.googleapis.com/v0/b/dice-dev-a5b63.appspot.com/o/images%2F%E1%84%85%E1%85%A9%E1%84%80%E1%85%A9.png?alt=media&token=da1aeee5-3cd9-4be1-a99c-80d80bee3f7c',
            },
            admin: {
              id: 1,
              nickname: 'Pinomaker',
              profile:
                'https://firebasestorage.googleapis.com/v0/b/dice-dev-a5b63.appspot.com/o/images%2FIMG_6159.jpg?alt=media&token=450c0181-8826-4856-b611-509712872450',
            },
            epic: {
              id: 1,
            },
          },
        ],
        count: 1,
      },
    }),
  },
  findOneTicket: {
    200: createResponse({
      statusCode: 200,
      message: 'Ticket을 조회합니다.',
      data: {
        epic: {
          id: 3,
          code: 'DICE-1',
          name: '게시판',
        },
        name: '상세보기 버튼',
        status: TicketStatus.Reopen,
        type: {
          type: 'Screen',
          color: '',
        },
        admin: {
          id: 3,
          nickname: 'admin',
          profile:
            'https://firebasestorage.googleapis.com/v0/b/dice-dev-a5b63.appspot.com/o/images%2F%E1%84%85%E1%85%A9%E1%84%80%E1%85%A9.png?alt=media&token=da1aeee5-3cd9-4be1-a99c-80d80bee3f7c',
        },
        worker: {
          id: 2,
          nickname: 'worker',
          profile:
            'https://firebasestorage.googleapis.com/v0/b/dice-dev-a5b63.appspot.com/o/images%2F%E1%84%85%E1%85%A9%E1%84%80%E1%85%A9.png?alt=media&token=da1aeee5-3cd9-4be1-a99c-80d80bee3f7c',
        },
        content: '상세보기 버튼 추가',
        storypoint: 2,
        file: [
          {
            id: 2,
            url: 'https://firebasestorage.googleapis.com/v0/b/dice-dev-a5b63.appspot.com/',
          },
        ],
        dueDate: '2024-01-20 00:00:00',
        endDate: '2024-01-19 00:00:00',
        reopenDate: '2024-01-22 00:00:00',
        regDate: '2024-01-15 00:00:00',
        modDate: '2024-01-16 00:00:00',
      },
    }),
    404: createErrorResponse({
      statusCode: 404,
      error: 'NOT FOUND',
      message: 'Ticket 정보를 찾을 수 없습니다.',
    }),
  },
  saveTicket: {
    200: createMessageResponse({
      statusCode: 200,
      message: 'Ticket을 생성합니다.',
    }),
    400: createErrorResponse({
      statusCode: 400,
      error: 'BAD REQUEST',
      message: '파일은 최대 4개입니다.',
    }),
    404: createErrorResponse({
      statusCode: 404,
      error: 'NOT FOUND',
      message: 'Epic 정보를 찾을 수 없습니다.',
    }),
  },
  updateTicket: {
    200: createMessageResponse({
      statusCode: 200,
      message: 'Ticket을 수정합니다.',
    }),
    400: createErrorResponse({
      statusCode: 400,
      error: 'BAD REQUEST',
      message: '파일은 최대 4개입니다.',
    }),
    404: createErrorResponse({
      statusCode: 404,
      error: 'NOT FOUND',
      message: 'Ticket 정보를 찾을 수 없습니다.',
    }),
  },
  deleteTicket: {
    200: createMessageResponse({
      statusCode: 200,
      message: 'Ticket을 삭제합니다.',
    }),
    404: createErrorResponse({
      statusCode: 404,
      error: 'NOT FOUND',
      message: 'Ticket 정보를 찾을 수 없습니다.',
    }),
  },
  updateTicketState: {
    200: createMessageResponse({
      statusCode: 200,
      message: 'Ticket 상태를 변경합니다.',
    }),
    404: createErrorResponse({
      statusCode: 404,
      error: 'NOT FOUND',
      message: 'Ticket 정보를 찾을 수 없습니다.',
    }),
  },
  findAllEpic: {
    200: createResponse({
      statusCode: 200,
      message: 'Epic을 전체 조회합니다.',
      data: {
        data: [
          {
            id: 3,
            code: 'DICE-1',
            name: '게시판',
            allTicketCount: 20,
            doneTicketCount: 16,
          },
        ],
        count: 1,
      },
    }),
  },
  findOneEpic: {
    200: createResponse({
      statusCode: 200,
      message: 'Epic을 상세 조회합니다.',
      data: {
        data: [
          {
            id: 3,
            name: '상세보기 버튼',
            status: TicketStatus.Reopen,
            worker: {
              id: 2,
              profile:
                'https://firebasestorage.googleapis.com/v0/b/dice-dev-a5b63.appspot.com/o/images%2F%E1%84%85%E1%85%A9%E1%84%80%E1%85%A9.png?alt=media&token=da1aeee5-3cd9-4be1-a99c-80d80bee3f7c',
            },
            dueDate: '2024-01-20',
            completeDate: '2024-01-19',
            reopenDate: '2024-01-22',
          },
        ],
        count: 1,
      },
    }),
    404: createErrorResponse({
      statusCode: 404,
      error: 'NOT FOUND',
      message: 'Epic 정보를 찾을 수 없습니다.',
    }),
  },
  saveEpic: {
    200: createMessageResponse({
      statusCode: 200,
      message: 'Epic을 생성합니다.',
    }),
    400: createErrorResponse({
      statusCode: 400,
      error: 'BAD REQUEST',
      message: 'Epic 이름은 최대 30자 입니다.',
    }),
  },
  updateEpic: {
    200: createMessageResponse({
      statusCode: 200,
      message: 'Epic을 수정합니다.',
    }),
    404: createErrorResponse({
      statusCode: 404,
      error: 'NOT FOUND',
      message: 'Epic 정보를 찾을 수 없습니다.',
    }),
    400: createErrorResponse({
      statusCode: 400,
      error: 'BAD REQUEST',
      message: 'Epic 이름은 최대 30자 입니다.',
    }),
  },
  deleteEpic: {
    200: createMessageResponse({
      statusCode: 200,
      message: 'Epic을 삭제합니다.',
    }),
    404: createErrorResponse({
      statusCode: 404,
      error: 'NOT FOUND',
      message: 'Epic 정보를 찾을 수 없습니다.',
    }),
  },
  findComment: {
    200: createResponse({
      statusCode: 200,
      message: '댓글을 조회합니다.',
      data: {
        data: [
          {
            id: 3,
            user: {
              id: 3,
              nickname: 'jooman',
              profile:
                'https://firebasestorage.googleapis.com/v0/b/dice-dev-a5b63.appspot.com/o/images%2F%E1%84%85%E1%85%A9%E1%84%80%E1%85%A9.png?alt=media&token=da1aeee5-3cd9-4be1-a99c-80d80bee3f7c',
            },
            regDate: '2024-01-28',
          },
        ],
        count: 1,
      },
    }),
    404: createErrorResponse({
      statusCode: 404,
      error: 'NOT FOUND',
      message: 'Ticket 정보를 찾을 수 없습니다.',
    }),
  },
  saveComment: {
    200: createMessageResponse({
      statusCode: 200,
      message: '댓글을 생성합니다.',
    }),
    404: createErrorResponse({
      statusCode: 404,
      error: 'NOT FOUND',
      message: 'Ticket 정보를 찾을 수 없습니다.',
    }),
  },
  updateComment: {
    200: createMessageResponse({
      statusCode: 200,
      message: '댓글을 수정합니다.',
    }),
    404: createErrorResponse({
      statusCode: 404,
      error: 'NOT FOUND',
      message: '댓글 정보를 찾을 수 없습니다.',
    }),
  },
  deleteComment: {
    200: createMessageResponse({
      statusCode: 200,
      message: '댓글을 삭제합니다.',
    }),
    404: createErrorResponse({
      statusCode: 404,
      error: 'NOT FOUND',
      message: '댓글 정보를 찾을 수 없습니다.',
    }),
  },
  findSetting: {
    200: createResponse({
      data: {
        data: [
          {
            id: 10,
            color: 'ff8080',
            type: 'FUNC',
            description: '냐',
            workspace: {
              id: 1,
            },
            admin: {
              id: 1,
            },
          },
          {
            id: 11,
            color: 'ffffff',
            type: 'SCN',
            description: 'description',
            workspace: {
              id: 1,
            },
            admin: {
              id: 1,
            },
          },
        ],
        count: 2,
      },
      statusCode: 200,
      message: 'Find Settings',
    }),
    404: createErrorResponse({
      statusCode: 404,
      error: 'NOT FOUND',
      message: 'setting에 대한 정보를 찾을 수 없습니다.',
    }),
  },
  findOneSetting: {
    200: createResponse({
      data: {
        id: 10,
        color: 'ff8080',
        type: 'FUNC',
        description: '냐',
        workspace: {
          id: 1,
        },
        admin: {
          id: 1,
        },
      },
      statusCode: 200,
      message: 'Find Setting',
    }),
    404: createErrorResponse({
      statusCode: 404,
      error: 'NOT FOUND',
      message: 'setting에 대한 정보를 찾을 수 없습니다.',
    }),
  },
  saveSetting: {
    200: createMessageResponse({
      statusCode: 200,
      message: 'Save Setting',
    }),
    404: createErrorResponse({
      statusCode: 404,
      error: 'NOT FOUND',
      message: 'Ticket 정보를 찾을 수 없습니다.',
    }),
  },
  updateSetting: {
    200: createMessageResponse({
      statusCode: 200,
      message: 'Update Setting',
    }),
    404: createErrorResponse({
      statusCode: 404,
      error: 'NOT FOUND',
      message: '해당 setting 정보를 찾을 수 없습니다.',
    }),
  },
  deleteSetting: {
    200: createMessageResponse({
      statusCode: 200,
      message: 'Delete Setting',
    }),
    404: createErrorResponse({
      statusCode: 404,
      error: 'NOT FOUND',
      message: '해당 setting 정보를 찾을 수 없습니다.',
    }),
  },
};
