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
            priority: 'MEDIUM',
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
            ticketSetting: {
              ticketSettingId: 2,
              type: 'GREEN',
              name: 'SCN',
            },
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
        name: 'Task - Gantt',
        code: 'HAF-1',
        content: '123',
        ticket: [
          {
            createdDate: '2024-08-12T01:11:09.644Z',
            modifiedDate: '2024-08-21T12:13:06.000Z',
            ticketId: 26,
            name: '간트차트의 Progress바의 범위 벗어나는 버그 수정',
            status: 'COMPLETE',
            content: null,
            code: 'HAF-8',
            storypoint: 0,
            dueDate: '2024-08-16',
            completeDate: '2024-08-16',
            reopenDate: null,
            admin: {
              userId: 4,
              email: 'inhoo987654321@gmail.com',
              nickname: '김인후',
              profile:
                'https://file.hi-dice.com/file//20240813111450-314631462_1719969028389444_6312286304904119979_n.jpg',
            },
            worker: {
              userId: 10,
              email: 'naayeah1@gmail.com',
              nickname: '백예나',
              profile:
                'https://file.hi-dice.com/file//20240818192412-áá¡á¼áá³áº áá®áá© áá¡á¯.jpeg',
            },
            ticketSetting: {
              ticketSettingId: 2,
              type: 'GREEN',
              name: 'SCN',
            },
          },
          {
            createdDate: '2024-08-18T12:27:07.294Z',
            modifiedDate: '2024-09-03T11:28:50.000Z',
            ticketId: 60,
            name: 'API 호출하여 리스트업하기',
            status: 'NOTHING',
            content: null,
            code: 'HAF-40',
            storypoint: 0,
            dueDate: '2024-09-08',
            completeDate: null,
            reopenDate: null,
            admin: {
              userId: 4,
              email: 'inhoo987654321@gmail.com',
              nickname: '김인후',
              profile:
                'https://file.hi-dice.com/file//20240813111450-314631462_1719969028389444_6312286304904119979_n.jpg',
            },
            worker: {
              userId: 10,
              email: 'naayeah1@gmail.com',
              nickname: '백예나',
              profile:
                'https://file.hi-dice.com/file//20240818192412-áá¡á¼áá³áº áá®áá© áá¡á¯.jpeg',
            },
            ticketSetting: {
              ticketSettingId: 4,
              type: 'YELLOW',
              name: 'FUNC',
            },
          },
          {
            createdDate: '2024-09-03T15:55:25.392Z',
            modifiedDate: '2024-09-03T15:55:35.000Z',
            ticketId: 104,
            name: '필터 UI 구성',
            status: 'NOTHING',
            content: null,
            code: 'HAF-80',
            storypoint: 0,
            dueDate: null,
            completeDate: null,
            reopenDate: null,
            admin: {
              userId: 4,
              email: 'inhoo987654321@gmail.com',
              nickname: '김인후',
              profile:
                'https://file.hi-dice.com/file//20240813111450-314631462_1719969028389444_6312286304904119979_n.jpg',
            },
            worker: {
              userId: 4,
              email: 'inhoo987654321@gmail.com',
              nickname: '김인후',
              profile:
                'https://file.hi-dice.com/file//20240813111450-314631462_1719969028389444_6312286304904119979_n.jpg',
            },
            ticketSetting: {
              ticketSettingId: 2,
              type: 'GREEN',
              name: 'SCN',
            },
          },
          {
            createdDate: '2024-09-03T15:55:30.421Z',
            modifiedDate: '2024-09-03T15:55:33.000Z',
            ticketId: 105,
            name: '필터 구성',
            status: 'NOTHING',
            content: null,
            code: 'HAF-81',
            storypoint: 0,
            dueDate: null,
            completeDate: null,
            reopenDate: null,
            admin: {
              userId: 4,
              email: 'inhoo987654321@gmail.com',
              nickname: '김인후',
              profile:
                'https://file.hi-dice.com/file//20240813111450-314631462_1719969028389444_6312286304904119979_n.jpg',
            },
            worker: {
              userId: 4,
              email: 'inhoo987654321@gmail.com',
              nickname: '김인후',
              profile:
                'https://file.hi-dice.com/file//20240813111450-314631462_1719969028389444_6312286304904119979_n.jpg',
            },
            ticketSetting: {
              ticketSettingId: 4,
              type: 'YELLOW',
              name: 'FUNC',
            },
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
