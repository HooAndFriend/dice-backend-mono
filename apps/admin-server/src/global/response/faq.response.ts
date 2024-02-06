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
};
