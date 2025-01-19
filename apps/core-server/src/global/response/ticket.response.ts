import { TaskStatusEnum } from '@hi-dice/common';
import {
  createErrorResponse,
  createMessageResponse,
  createResponse,
} from './common';

export const TicketResponse = {
  findMyTicketList: {
    200: createResponse({
      data: {
        data: [
          {
            ticketId: 97,
            name: '게시글이 최초 선택한 게시글 하위로 생성됨.',
            orderId: 1,
            status: 'COMPLETE',
            code: 'HAF-73',
            dueDate: '2024-09-05',
            completeDate: '2024-09-04',
            reopenDate: null,
            ticketSetting: {
              ticketSettingId: 4,
              type: 'YELLOW',
              name: 'FUNC',
            },
            worker: {
              userId: 4,
              email: 'inhoo987654321@gmail.com',
              nickname: '김인후',
              profile:
                'https://file.hi-dice.com/file//20240813111450-314631462_1719969028389444_6312286304904119979_n.jpg',
            },
            admin: {
              userId: 4,
              email: 'inhoo987654321@gmail.com',
              nickname: '김인후',
              profile:
                'https://file.hi-dice.com/file//20240813111450-314631462_1719969028389444_6312286304904119979_n.jpg',
            },
          },
          {
            ticketId: 96,
            name: 'due date 삭제 기능 구현',
            orderId: 1,
            status: 'COMPLETE',
            code: 'HAF-72',
            dueDate: '2024-09-03',
            completeDate: '2024-09-03',
            reopenDate: null,
            ticketSetting: {
              ticketSettingId: 4,
              type: 'YELLOW',
              name: 'FUNC',
            },
            worker: {
              userId: 4,
              email: 'inhoo987654321@gmail.com',
              nickname: '김인후',
              profile:
                'https://file.hi-dice.com/file//20240813111450-314631462_1719969028389444_6312286304904119979_n.jpg',
            },
            admin: {
              userId: 4,
              email: 'inhoo987654321@gmail.com',
              nickname: '김인후',
              profile:
                'https://file.hi-dice.com/file//20240813111450-314631462_1719969028389444_6312286304904119979_n.jpg',
            },
          },
        ],
        count: 2,
      },
      statusCode: 200,
      message: '나의 Ticket을 전체 조회합니다.',
    }),
  },
  findStats: {
    200: createResponse({
      data: {
        totalCount: 89,
        totalDoneCount: 47,
        userList: [
          {
            userId: 2,
            email: 'admin',
            nickname: '관리자',
            profile:
              'https://firebasestorage.googleapis.com/v0/b/dice-dev-a5b63.appspot.com/o/images%2FIMG_6159.jpg?alt=media&token=450c0181-8826-4856-b611-509712872450',
            ticketCount: 1,
            ticketDoneCount: 1,
          },
          {
            userId: 5,
            email: 'mkni0216@gmail.com',
            nickname: '민규',
            profile:
              'https://file.hi-dice.com/file//20240813121509-ì¤í¬ë¦°ì· 2024-07-30 163537.png',
            ticketCount: 0,
            ticketDoneCount: 0,
          },
          {
            userId: 6,
            email: 'yoonalim2003@gmail.com',
            nickname: '임유나',
            profile:
              'https://file.hi-dice.com/file//20240816191807-IMG_3015.jfif',
            ticketCount: 1,
            ticketDoneCount: 0,
          },
          {
            userId: 7,
            email: 'chhari0708@naver.com',
            nickname: 'hyerim',
            profile:
              'https://file.hi-dice.com/file//20240816000417-áá³áá³ááµá«áá£áº 2024-08-16 áá©áá¥á« 12.03.51.png',
            ticketCount: 11,
            ticketDoneCount: 2,
          },
          {
            userId: 10,
            email: 'naayeah1@gmail.com',
            nickname: '백예나',
            profile:
              'https://file.hi-dice.com/file//20240818192412-áá¡á¼áá³áº áá®áá© áá¡á¯.jpeg',
            ticketCount: 2,
            ticketDoneCount: 1,
          },
          {
            userId: 8,
            email: 'dio8620@naver.com',
            nickname: '임동현',
            profile:
              'https://firebasestorage.googleapis.com/v0/b/dice-dev-a5b63.appspot.com/o/images%2FIMG_6159.jpg?alt=media&token=450c0181-8826-4856-b611-509712872450',
            ticketCount: 3,
            ticketDoneCount: 0,
          },
          {
            userId: 4,
            email: 'inhoo987654321@gmail.com',
            nickname: '김인후',
            profile:
              'https://file.hi-dice.com/file//20240813111450-314631462_1719969028389444_6312286304904119979_n.jpg',
            ticketCount: 62,
            ticketDoneCount: 43,
          },
        ],
        user: {
          myCount: 62,
          myDoneCount: 43,
          myTodayCount: 12,
          myTodayDoneCount: 8,
        },
      },
      statusCode: 200,
      message: '워크스페이스의 티켓 통계를 조회합니다.',
    }),
  },
  findAllTicket: {
    200: createResponse({
      data: {
        data: [
          {
            ticketId: 1,
            name: '게시판',
            priority: 'MEDIUM',
            orderId: 1,
            status: 'NOTHING',
            code: 'PIN-1',
            dueDate: null,
            completeDate: null,
            reopenDate: null,
            ticketSetting: {
              ticketSettingId: 1,
              type: 'BLACK',
              name: 'SCN',
            },
            worker: null,
            subTickets: [
              {
                ticketId: 2,
                name: '게시판',
                orderId: 1,
                status: 'NOTHING',
                code: 'PIN-1',
                dueDate: null,
                completeDate: null,
                reopenDate: null,
                ticketSetting: {
                  ticketSettingId: 1,
                  type: 'BLACK',
                  name: 'SCN',
                },
                worker: null,
              },
            ],
          },
        ],
        count: 1,
      },
      statusCode: 200,
      message: 'Ticket을 전체 조회합니다.',
    }),
  },
  findOneTicket: {
    200: createResponse({
      data: {
        createdDate: '2024-12-18T05:36:07.151Z',
        modifiedDate: '2024-12-19T01:01:15.000Z',
        ticketId: 303,
        name: 'EPIC DND 구현',
        status: 'NOTHING',
        content: null,
        code: 'HAF-9',
        storypoint: 0,
        priority: 'MEDIUM',
        dueDate: '2024-12-27',
        completeDate: null,
        reopenDate: null,
        ticketFile: [],
        ticketSetting: {
          ticketSettingId: 4,
          type: 'YELLOW',
          name: 'FUNC',
        },
        admin: {
          userId: 4,
          email: 'inhoo987654321@gmail.com',
          nickname: '김인후',
          profile:
            'https://file.hi-dice.com/file//20240813111450-314631462_1719969028389444_6312286304904119979_n.jpg',
        },
        worker: {
          userId: 7,
          email: 'chhari0708@naver.com',
          nickname: '최혜림',
          profile:
            'https://file.hi-dice.com/file//20240816000417-áá³áá³ááµá«áá£áº 2024-08-16 áá©áá¥á« 12.03.51.png',
        },
        childLink: [],
        parentLink: [],
        board: {
          createdDate: '2024-12-20T13:32:14.753Z',
          modifiedDate: '2024-12-20T13:32:14.753Z',
          boardId: 154,
          title: '',
          createdId: '',
          modifiedId: '',
          orderId: 0,
          subId: 303,
          type: 'TICKET_BOARD',
          isDeleted: false,
          children: [],
          parent: null,
          content: null,
        },
      },
      statusCode: 200,
      message: 'Ticket을 상세 조회 합니다.',
    }),
    404: createErrorResponse({
      statusCode: 404,
      error: 'NOT FOUND',
      message: 'Ticket 정보를 찾을 수 없습니다.',
    }),
  },
  multiTicketDelete: {
    200: createMessageResponse({
      statusCode: 200,
      message: 'Ticket을 다중 삭제합니다.',
    }),
  },
  saveTicket: {
    200: createMessageResponse({
      statusCode: 200,
      message: 'Ticket을 생성합니다.',
    }),
    404.1: createErrorResponse({
      statusCode: 404,
      error: 'NOT FOUND',
      message: 'Not Found Ticket Setting',
    }),
    404.2: createErrorResponse({
      statusCode: 404,
      error: 'NOT FOUND',
      message: 'Not Found Epic',
    }),
  },
  multiTicketSettingUpdate: {
    200: createMessageResponse({
      statusCode: 200,
      message: 'Ticket Setting을 수정합니다.',
    }),
    404: createErrorResponse({
      statusCode: 404,
      error: 'NOT FOUND',
      message: 'Ticket Setting 정보를 찾을 수 없습니다.',
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
  findEpicList: {
    200: createResponse({
      data: {
        data: [
          {
            id: 6,
            name: 'DICE 로그인 수정',
            orderId: 1,
            code: 'ADM-1',
          },
          {
            id: 7,
            name: '감자',
            orderId: 1,
            code: 'ADM-2',
          },
          {
            id: 33,
            name: '토마토',
            orderId: 1,
            code: 'ADM-2',
          },
          {
            id: 34,
            name: '사과',
            orderId: 1,
            code: 'ADM-2',
          },
          {
            id: 35,
            name: '바나나',
            orderId: 1,
            code: 'ADM-2',
          },
          {
            id: 36,
            name: '수박',
            orderId: 1,
            code: 'ADM-2',
          },
          {
            id: 37,
            name: '오이',
            orderId: 1,
            code: 'ADM-2',
          },
          {
            id: 38,
            name: '123123',
            orderId: 1,
            code: 'ADM-8',
          },
          {
            id: 39,
            name: '11',
            orderId: 1,
            code: 'ADM-9',
          },
        ],
        count: 9,
      },
      statusCode: 200,
      message: 'Epic을 전체 조회합니다.',
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
                  id: 13,
                  type: 'OTHER',
                  name: 'FUNC',
                },
                worker: {
                  id: 5,
                  nickname: '유나나나나ㅏ나나나나ㅏ나',
                  email: '123',
                  profile:
                    'http://125.133.34.224:9000/dice-dev/d859a4892dfc1d7d4e12c1e748a8ad93.jpg',
                },
              },
            ],
            doneTicketCount: 1,
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
  findEpic: {
    200: createResponse({
      data: {
        id: 6,
        name: '파인애플',
        code: 'ADM-1',
        dueDate: null,
        ticket: [
          {
            id: 12,
            name: '',
            status: 'NOTHING',
            code: '',
          },
          {
            id: 10,
            name: '123121113',
            status: 'NOTHING',
            code: '',
          },
          {
            id: 11,
            name: '',
            status: 'NOTHING',
            code: '',
          },
        ],
        admin: {
          id: 1,
          nickname: '!!!피노피노얍',
          profile: 'http://125.133.34.224:9000/dice-dev/rn.png',
        },
      },
      statusCode: 200,
      message: 'Epic을 조회합니다.',
    }),
    404: createErrorResponse({
      statusCode: 404,
      error: 'NOT FOUND',
      message: 'Epic 정보를 찾을 수 없습니다.',
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
            type: 'OTHER',
            name: 'FUNC',
            description: '냐',
          },
          {
            id: 11,
            type: 'OTHER',
            name: 'FUNC',
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
        type: 'OTHER',
        name: 'FUNC',
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
  },
  findAll: {
    200: createResponse({
      data: {
        data: [
          {
            createdDate: '2025-01-19T15:01:42.172Z',
            modifiedDate: '2025-01-19T15:01:42.172Z',
            ticketLabelId: 1,
            name: 'SCN',
            description: '해당 타입은 이거 입니다.',
            bgColor: '#fff',
            color: 'black',
          },
        ],
        count: 1,
      },
      statusCode: 200,
      message: 'Find Label List',
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
  saveTicketLink: {
    200: createMessageResponse({
      statusCode: 200,
      message: 'Save Ticket Link',
    }),
    400: createErrorResponse({
      statusCode: 400,
      error: 'BAD REQUEST',
      message: 'Already Exist Ticket Link',
    }),
    404: createErrorResponse({
      statusCode: 404,
      error: 'NOT FOUND',
      message: 'Not Found Ticket',
    }),
  },
  deleteTicketLink: {
    200: createMessageResponse({
      statusCode: 200,
      message: 'Delete Ticket Link',
    }),
    404: createErrorResponse({
      statusCode: 404,
      error: 'NOT FOUND',
      message: 'Not Found Ticket Link',
    }),
  },
  findAllTicketAdmin: {
    200: createResponse({
      statusCode: 200,
      message: 'Find All Ticket Admin',
      data: {
        ticket: [
          {
            ticketId: 24,
            name: '게시판 수정, 생성, 조회 모드의 UI 통합',
            status: 'COMPLETE',
            content: '<p>라벨 클릭 시에 다른 유저 선택됨.</p><p><br></p>',
            storypoint: 0,
            dueDate: '2024-08-13',
            completeDate: '2024-08-18',
            reopenDate: '2024-08-24',
            workspace: {
              workspaceId: 12,
            },
            epic: {
              epicId: 4,
            },
            admin: {
              userId: 4,
              nickname: '임꺽정',
              profile: 'https://file.hi-dice.com/file//hidice.png',
            },
            worker: {
              userId: 7,
              nickname: '홍길동',
              profile: 'https://file.hi-dice.com/file//hidice.png',
            },
          },
        ],
        count: 1,
      },
    }),
  },
};
