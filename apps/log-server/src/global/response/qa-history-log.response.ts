import {
  createErrorResponse,
  createResponse,
  createMessageResponse,
} from './common';
export const QaHistoryLogResponse = {
  findQaHistoryList: {
    200: createResponse({
      data: {
        data: [
          {
            createdDate: '2024-03-31T07:21:49.523Z',
            id: '7',
            qaId: 1,
            username: 'admin',
            subUsername: null,
            type: 'WORKER',
            after: 'admin',
            before: 'admin',
            log: null,
          },
          {
            createdDate: '2024-03-29T09:11:59.421Z',
            id: '2',
            qaId: 1,
            username: '혜림',
            subUsername: null,
            type: 'WORKER',
            after: '혜림',
            before: '혜림',
            log: null,
          },
          {
            createdDate: '2024-03-29T09:11:57.592Z',
            id: '1',
            qaId: 1,
            username: '혜림',
            subUsername: null,
            type: 'WORKER',
            after: '혜림',
            before: '혜림',
            log: null,
          },
        ],
        count: 3,
      },
      statusCode: 200,
      message: 'Find Qa History List',
    }),
  },
};
