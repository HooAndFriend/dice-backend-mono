import {
  createErrorResponse,
  createMessageResponse,
  createSuccessResponse,
} from './common';

export const PhoneResponse = {
  savePhone: {
    200: createMessageResponse({
      message: '전화번호를 생성합니다.',
      statusCode: 200,
    }),
    400: createErrorResponse({
      statusCode: 400,
      message: '이미 존재하는 번호 입니다.',
      error: 'BAD REQUEST',
    }),
  },
  findPhoneList: {
    200: createSuccessResponse({
      data: {
        data: [
          {
            createdAt: '2023-09-10T15:56:12.203Z',
            id: 3,
            name: '김인후',
            number: '010631057848',
          },
        ],
        count: 1,
      },
      statusCode: 200,
      message: '전화번호 리스트를 조회합니다.',
    }),
  },
};
