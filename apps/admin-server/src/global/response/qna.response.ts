import {
  createErrorResponse,
  createMessageResponse,
  createResponse,
} from './common';

export const QnaResponse = {
  findQnaList: {
    200: createResponse({
      data: {
        data: [
          {
            createdAt: '2024-02-06T08:48:35.085Z',
            id: 1,
            name: '이가인',
            email: 'asd@asd.com',
            category: 'BASIC',
            title: '질문',
            answerDate: null,
            isAnswer: false,
          },
        ],
        count: 1,
      },
      statusCode: 200,
      message: 'Qna 리스트를 조회합니다.',
    }),
  },
};
