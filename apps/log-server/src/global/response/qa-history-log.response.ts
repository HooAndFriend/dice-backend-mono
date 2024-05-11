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
            createdDate: '2024-05-11T10:03:53.046Z',
            id: '100',
            qaId: 56,
            email: 'admin',
            type: 'DUE_DATE',
            log: 'Thu May 09 2024 09:00:00 GMT+0900 (Korean Standard Time) -> 2024-05-09',
            user: {
              email: 'admin',
              nickname: 'DICE ADMIN',
              profile: 'https://file.hi-dice.com/file//workspaceLogo.png',
            },
          },
          {
            createdDate: '2024-05-11T10:01:38.016Z',
            id: '99',
            qaId: 56,
            email: '1',
            type: 'CREATE',
            log: 'QA를 생성했습니다.',
            user: null,
          },
        ],
        count: 3,
      },
      statusCode: 200,
      message: 'Find Qa History List',
    }),
  },
};
