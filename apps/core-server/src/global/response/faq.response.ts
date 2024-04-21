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
            createdDate: '2024-04-21T16:13:26.519Z',
            id: 1,
            question: '이거는 어떻게 해요?',
            answer: '이렇게 합니다.',
            csCategory: {
              id: 2,
              name: '전체',
            },
          },
        ],
        count: 1,
      },
      statusCode: 200,
      message: 'Faq 리스트를 조회합니다.',
    }),
  },
};
