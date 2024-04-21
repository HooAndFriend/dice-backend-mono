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
            createdDate: '2024-04-21T16:19:09.592Z',
            id: 2,
            name: '이가인',
            email: 'admin@admin.co.kr',
            title: '질문 입니다.',
            answerDate: null,
            isAnswer: false,
            csCategory: {
              id: 2,
              name: '전체',
            },
          },
          {
            createdDate: '2024-04-13T16:14:18.391Z',
            id: 1,
            name: '김인후',
            email: 'inhoo987654321@gmail.com',
            title: '질문 있어요!',
            answerDate: null,
            isAnswer: false,
            csCategory: null,
          },
        ],
        count: 2,
      },
      statusCode: 200,
      message: 'Qna 리스트를 조회합니다.',
    }),
  },
  findQna: {
    200: createResponse({
      data: {
        createdDate: '2024-02-06T08:48:35.085Z',
        modifiedDate: '2024-02-06T08:48:35.085Z',
        id: 1,
        name: '이가인',
        email: 'asd@asd.com',
        title: '질문',
        text: '있어요',
        file: null,
        answer: null,
        answerId: null,
        answerDate: null,
        isAnswer: false,
        csCategory: {
          id: 2,
          name: '전체',
        },
      },
      statusCode: 200,
      message: 'Qna를 조회합니다.',
    }),
    404: createErrorResponse({
      statusCode: 404,
      message: 'Qna를 찾을 수 없습니다.',
      error: 'NOT FOUND',
    }),
  },
  answerQna: {
    200: createMessageResponse({
      statusCode: 200,
      message: 'Qna에 답변했습니다.',
    }),
    400: createErrorResponse({
      statusCode: 400,
      message: '답변할 수 없습니다.',
      error: 'BAD REQUEST',
    }),
    404: createErrorResponse({
      statusCode: 404,
      message: 'Qna를 찾을 수 없습니다.',
      error: 'NOT FOUND',
    }),
  },
};
