import {
  createErrorResponse,
  createMessageResponse,
  createResponse,
} from './common';

export const FaqResponse = {
  saveFaq: {
    200: createMessageResponse({
      statusCode: 200,
      message: 'Faq를 생성했습니다.',
    }),
  },
  findFaqList: {
    200: createResponse({
      data: {
        data: [
          {
            createdAt: '2024-02-06T06:10:25.464Z',
            id: 1,
            question: '이거는 어떻게 해요?',
            category: 'BASIC',
            createdId: 'admin',
            isEnabled: true,
          },
        ],
        count: 1,
      },
      statusCode: 200,
      message: 'Faq 리스트를 조회합니다.',
    }),
  },
};
