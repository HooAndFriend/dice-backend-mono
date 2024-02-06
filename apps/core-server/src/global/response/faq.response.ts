import {
  createErrorResponse,
  createMessageResponse,
  createResponse,
  createPaginationResponse,
} from './common';

export const FaqResponse = {
  findFaqList: {
    200: createResponse({
      data: {
        data: [
          {
            createdAt: '2024-02-06T06:34:36.422Z',
            id: 2,
            question: '이거는 어떻게 해요?123123123123',
            answer: '이렇게 합니다.',
            category: 'BASIC',
          },
        ],
        count: 1,
      },
      statusCode: 200,
      message: 'Faq 리스트를 조회합니다.',
    }),
  },
};
