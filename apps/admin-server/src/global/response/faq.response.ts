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
            createdDate: '2024-04-21T16:13:26.519Z',
            id: 1,
            question: '이거는 어떻게 해요?',
            createdId: 'admin',
            isEnabled: true,
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
  findFaq: {
    200: createResponse({
      data: {
        createdDate: '2024-02-06T06:10:25.464Z',
        modifiedDate: '2024-02-06T06:10:25.464Z',
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
      message: 'Faq를 삭제합니다.',
    }),
    404: createErrorResponse({
      statusCode: 404,
      message: 'Faq를 찾을 수 없습니다.',
      error: 'NOT FOUND',
    }),
  },
  updateFaq: {
    200: createMessageResponse({
      statusCode: 200,
      message: 'Faq를 수정합니다.',
    }),
    404: createErrorResponse({
      statusCode: 404,
      message: 'Faq를 찾을 수 없습니다.',
      error: 'NOT FOUND',
    }),
  },
};
