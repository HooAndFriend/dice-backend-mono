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
  findFaq: {
    200: createResponse({
      data: {
        createdAt: '2024-02-06T06:10:25.464Z',
        updatedAt: '2024-02-06T06:10:25.464Z',
        id: 1,
        question: '이거는 어떻게 해요?',
        answer: '이렇게 합니다.',
        file: '',
        category: 'BASIC',
        createdId: 'admin',
        modifiedId: 'admin',
        isEnabled: true,
      },
      statusCode: 200,
      message: 'Faq를 조회합니다.',
    }),
    404: createErrorResponse({
      statusCode: 404,
      message: 'Faq를 찾을 수 없습니다.',
      error: 'NOT FOUND',
    }),
  },
  deleteFaq: {
    200: createMessageResponse({
      statusCode: 200,
      message: 'Faq를 삭제합니다..',
    }),
    404: createErrorResponse({
      statusCode: 404,
      message: 'Faq를 찾을 수 없습니다.',
      error: 'NOT FOUND',
    }),
  },
};
