import { TaskStatusEnum } from '../enum/TaskStatus.enum';
import {
  createErrorResponse,
  createMessageResponse,
  createResponse,
} from './common';

export const TicketResponse = {
  findAllTicket: {
    200: createResponse({
      data: {
        data: [
          {
            id: 2,
            name: '감자탕',
            status: 'WAITING',
            code: 'ADM-1',
            dueDate: '2024-04-24',
            completeDate: null,
            reopenDate: null,
            ticketSetting: {
              id: 11,
              color: '#c89898',
              type: '123',
            },
            worker: {
              id: 5,
              nickname: '유나나나나ㅏ나나나나ㅏ나',
              profile:
                'http://125.133.34.224:9000/dice-dev/d859a4892dfc1d7d4e12c1e748a8ad93.jpg',
            },
            admin: {
              id: 1,
              nickname: 'admin',
              profile:
                'http://125.133.34.224:9000/dice-dev/KakaoTalk_Image_2023-04-20-18-16-20-removebg-preview.png',
            },
            epic: {
              id: 1,
              name: '1123123',
            },
          },
          {
            id: 3,
            name: '감자탕123123',
            status: 'COMPLETE',
            code: 'ADM-1',
            dueDate: '2024-04-18',
            completeDate: '2024-04-04',
            reopenDate: '2024-04-04',
            ticketSetting: null,
            worker: {
              id: 1,
              nickname: 'admin',
              profile:
                'http://125.133.34.224:9000/dice-dev/KakaoTalk_Image_2023-04-20-18-16-20-removebg-preview.png',
            },
            admin: {
              id: 1,
              nickname: 'admin',
              profile:
                'http://125.133.34.224:9000/dice-dev/KakaoTalk_Image_2023-04-20-18-16-20-removebg-preview.png',
            },
            epic: {
              id: 1,
              name: '1123123',
            },
          },
          {
            id: 4,
            name: '감자탕',
            status: 'DOING',
            code: 'ADM-1',
            dueDate: '2024-04-04',
            completeDate: null,
            reopenDate: null,
            ticketSetting: null,
            worker: {
              id: 4,
              nickname: 'skskdldks12',
              profile:
                'https://firebasestorage.googleapis.com/v0/b/dice-dev-a5b63.appspot.com/o/images%2FIMG_6159.jpg?alt=media&token=450c0181-8826-4856-b611-509712872450',
            },
            admin: {
              id: 1,
              nickname: 'admin',
              profile:
                'http://125.133.34.224:9000/dice-dev/KakaoTalk_Image_2023-04-20-18-16-20-removebg-preview.png',
            },
            epic: {
              id: 1,
              name: '1123123',
            },
          },
          {
            id: 7,
            name: '감자탕',
            status: 'COMPLETE',
            code: 'HAF-4',
            dueDate: null,
            completeDate: '2024-04-04',
            reopenDate: null,
            ticketSetting: null,
            worker: null,
            admin: {
              id: 1,
              nickname: 'admin',
              profile:
                'http://125.133.34.224:9000/dice-dev/KakaoTalk_Image_2023-04-20-18-16-20-removebg-preview.png',
            },
            epic: null,
          },
          {
            id: 8,
            name: '감자탕',
            status: 'DONE',
            code: 'HAF-5',
            dueDate: null,
            completeDate: null,
            reopenDate: null,
            ticketSetting: null,
            worker: null,
            admin: {
              id: 1,
              nickname: 'admin',
              profile:
                'http://125.133.34.224:9000/dice-dev/KakaoTalk_Image_2023-04-20-18-16-20-removebg-preview.png',
            },
            epic: null,
          },
        ],
        count: 5,
      },
      statusCode: 200,
      message: 'Ticket을 전체 조회합니다.',
    }),
  },
  findOneTicket: {
    200: createResponse({
      data: {
        createdDate: '2024-03-31T07:46:33.453Z',
        modifiedDate: '2024-04-04T06:54:04.000Z',
        id: 4,
        name: '게시판',
        status: 'DOING',
        content: null,
        code: 'ADM-1',
        storypoint: null,
        dueDate: '2024-04-04',
        completeDate: null,
        reopenDate: null,
        ticketFile: [],
        workspace: {
          id: 3,
        },
        epic: {
          id: 1,
          name: '1123123',
        },
        admin: {
          id: 1,
          nickname: 'admin',
          profile:
            'http://125.133.34.224:9000/dice-dev/KakaoTalk_Image_2023-04-20-18-16-20-removebg-preview.png',
        },
        worker: {
          id: 4,
          nickname: 'skskdldks12',
          profile:
            'https://firebasestorage.googleapis.com/v0/b/dice-dev-a5b63.appspot.com/o/images%2FIMG_6159.jpg?alt=media&token=450c0181-8826-4856-b611-509712872450',
        },
      },
      statusCode: 200,
      message: 'Finding Tickets',
    }),
    404: createErrorResponse({
      statusCode: 404,
      error: 'NOT FOUND',
      message: 'Ticket 정보를 찾을 수 없습니다.',
    }),
  },
  saveSimpleTicket: {
    200: createMessageResponse({
      statusCode: 200,
      message: 'Ticket을 생성합니다.',
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
  updateTicketUser: {
    200: createMessageResponse({
      statusCode: 200,
      message: 'Ticket 담당자를 수정합니다.',
    }),
    404.1: createErrorResponse({
      statusCode: 404,
      error: 'NOT FOUND',
      message: 'Not Found Ticket',
    }),
    404.2: createErrorResponse({
      statusCode: 404,
      error: 'NOT FOUND',
      message: 'Not Found User',
    }),
  },
  updateTicketDueDate: {
    200: createMessageResponse({
      statusCode: 200,
      message: 'Ticket due date를 수정합니다.',
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
      data: {
        data: [
          {
            id: 1,
            name: '1123123',
            code: 'ADM-1',
            dueDate: null,
            ticket: [
              {
                createdDate: '2024-03-31T07:46:33.453Z',
                id: 2,
                name: '감자탕',
                status: 'WAITING',
                code: 'ADM-1',
                dueDate: '2024-04-24',
                completeDate: null,
                reopenDate: null,
                ticketSetting: {
                  id: 11,
                  color: '#c89898',
                  type: '123',
                },
                worker: {
                  id: 5,
                  nickname: '유나나나나ㅏ나나나나ㅏ나',
                  profile:
                    'http://125.133.34.224:9000/dice-dev/d859a4892dfc1d7d4e12c1e748a8ad93.jpg',
                },
              },
              {
                createdDate: '2024-03-31T07:46:33.453Z',
                id: 3,
                name: '감자탕123123',
                status: 'COMPLETE',
                code: 'ADM-1',
                dueDate: '2024-04-18',
                completeDate: '2024-04-04',
                reopenDate: '2024-04-04',
                ticketSetting: null,
                worker: {
                  id: 1,
                  nickname: 'admin',
                  profile:
                    'http://125.133.34.224:9000/dice-dev/KakaoTalk_Image_2023-04-20-18-16-20-removebg-preview.png',
                },
              },
              {
                createdDate: '2024-03-31T07:46:33.453Z',
                id: 4,
                name: '감자탕',
                status: 'DOING',
                code: 'ADM-1',
                dueDate: '2024-04-04',
                completeDate: null,
                reopenDate: null,
                ticketSetting: null,
                worker: {
                  id: 4,
                  nickname: 'skskdldks12',
                  profile:
                    'https://firebasestorage.googleapis.com/v0/b/dice-dev-a5b63.appspot.com/o/images%2FIMG_6159.jpg?alt=media&token=450c0181-8826-4856-b611-509712872450',
                },
              },
            ],
            doneTicketCount: 1,
          },
          {
            id: 2,
            name: '123123123',
            code: 'ADM-2',
            dueDate: null,
            ticket: [
              {
                createdDate: '2024-03-31T07:46:33.453Z',
                id: 1,
                name: '감자탕',
                status: 'DOING',
                code: 'ADM-1',
                dueDate: '2024-04-24',
                completeDate: null,
                reopenDate: null,
                ticketSetting: null,
                worker: {
                  id: 1,
                  nickname: 'admin',
                  profile:
                    'http://125.133.34.224:9000/dice-dev/KakaoTalk_Image_2023-04-20-18-16-20-removebg-preview.png',
                },
              },
              {
                createdDate: '2024-04-03T17:41:41.922Z',
                id: 5,
                name: '감자탕',
                status: 'WAITING',
                code: 'ADM-2',
                dueDate: null,
                completeDate: null,
                reopenDate: null,
                ticketSetting: null,
                worker: {
                  id: 1,
                  nickname: 'admin',
                  profile:
                    'http://125.133.34.224:9000/dice-dev/KakaoTalk_Image_2023-04-20-18-16-20-removebg-preview.png',
                },
              },
            ],
            doneTicketCount: 0,
          },
          {
            id: 3,
            name: '123123123122',
            code: 'ADM-3',
            dueDate: null,
            ticket: [],
            doneTicketCount: 0,
          },
          {
            id: 4,
            name: '1',
            code: 'ADM-4',
            dueDate: null,
            ticket: [],
            doneTicketCount: 0,
          },
          {
            id: 5,
            name: '123123',
            code: 'ADM-5',
            dueDate: null,
            ticket: [],
            doneTicketCount: 0,
          },
        ],
        count: 5,
      },
      statusCode: 200,
      message: 'Epic을 전체 조회합니다.',
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
            status: TaskStatusEnum.COMPLETE,
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
  updateDueDateEpic: {
    200: createMessageResponse({
      statusCode: 200,
      message: 'Epic Due Date를 수정합니다.',
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
  saveTicketFile: {
    200: createMessageResponse({
      statusCode: 200,
      message: 'Save Ticket File',
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
  deleteTicketFile: {
    200: createMessageResponse({
      statusCode: 200,
      message: 'Delete Ticket File',
    }),
    404: createErrorResponse({
      statusCode: 404,
      error: 'NOT FOUND',
      message: 'Not Found Ticket File',
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
          },
          {
            id: 11,
            color: 'ffffff',
            type: 'SCN',
            description: 'description',
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
