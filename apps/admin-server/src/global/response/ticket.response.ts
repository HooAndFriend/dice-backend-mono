import { TaskStatusEnum } from '../enum/TaskStatus.enum';
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
        ticket: [
          {
            id: 1,
            name: '상세보기 버튼',
            content: 'ticket 내용',
            status: TaskStatusEnum.REOPEN,
            workspace: {
              id: 1,
            },
            epic: {
              id: 1,
            },
            admin: {
              id: 1,
              nickname: 'Pinomaker',
              profile:
                'https://firebasestorage.googleapis.com/v0/b/dice-dev-a5b63.appspot.com/o/images%2FIMG_6159.jpg?alt=media&token=450c0181-8826-4856-b611-509712872450',
            },
            worker: {
              id: 2,
              profile:
                'https://firebasestorage.googleapis.com/v0/b/dice-dev-a5b63.appspot.com/o/images%2F%E1%84%85%E1%85%A9%E1%84%80%E1%85%A9.png?alt=media&token=da1aeee5-3cd9-4be1-a99c-80d80bee3f7c',
            },
            storypoint: 30,
            dueDate: '2024-01-20',
            completeDate: '2024-01-19',
            reopenDate: '2024-01-22',
          },
        ],
        count: 1,
      },
    }),
  },
};
