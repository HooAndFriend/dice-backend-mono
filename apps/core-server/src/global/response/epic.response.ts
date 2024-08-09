import { TaskStatusEnum } from '@hi-dice/common';
import {
  createErrorResponse,
  createMessageResponse,
  createResponse,
} from './common';

export const EpicResponse = {
  findAllEpic: {
    200: createResponse({
      data: {
        data: [
          {
            epicId: 1,
            name: 'DICE 로그인 수정',
            orderId: 1,
            code: 'HAF-1',
            ticket: [
              {
                createdDate: '2024-08-09T08:34:05.070Z',
                ticketId: 4,
                name: '게시판',
                orderId: 1,
                status: 'NOTHING',
                code: 'HAF-1',
                dueDate: null,
                completeDate: null,
                reopenDate: null,
                ticketSetting: {
                  ticketSettingId: 1,
                  type: 'BLUE',
                  name: '티켓',
                },
                worker: null,
              },
            ],
            doneTicketCount: 0,
          },
        ],
        count: 1,
      },
      statusCode: 200,
      message: 'Epic을 전체 조회합니다.',
    }),
  },
  findEpicList: {
    200: createResponse({
      data: {
        data: [
          {
            epicId: 1,
            name: 'DICE 로그인 수정',
            orderId: 1,
            code: 'HAF-1',
          },
        ],
        count: 1,
      },
      statusCode: 200,
      message: 'Epic을 전체 조회합니다.',
    }),
  },
  saveEpic: {
    200: createMessageResponse({
      statusCode: 200,
      message: 'Epic을 생성합니다.',
    }),
  },
  updateEpic: {
    200: createMessageResponse({
      statusCode: 200,
      message: 'Epic을 수정합니다.',
    }),
    404: createErrorResponse({
      error: 'NOT FOUND',
      statusCode: 404,
      message: 'Epic을 찾을 수 없습니다.',
    }),
  },
  deleteEpic: {
    200: createMessageResponse({
      statusCode: 200,
      message: 'Epic을 삭제합니다.',
    }),
    404: createErrorResponse({
      error: 'NOT FOUND',
      statusCode: 404,
      message: 'Epic을 찾을 수 없습니다.',
    }),
  },
  findEpic: {
    200: createResponse({
      data: {
        epicId: 1,
        name: 'DICE 로그인 수정',
        code: 'HAF-1',
        content: 'DICE ',
        ticket: [
          {
            ticketId: 4,
            name: '게시판',
            status: 'NOTHING',
            code: 'HAF-1',
          },
        ],
      },
      statusCode: 200,
      message: 'Epic을 조회합니다.',
    }),
    404: createErrorResponse({
      error: 'NOT FOUND',
      statusCode: 404,
      message: 'Epic을 찾을 수 없습니다.',
    }),
  },
};
