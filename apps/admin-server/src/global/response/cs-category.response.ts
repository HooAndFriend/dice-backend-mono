import {
  createErrorResponse,
  createMessageResponse,
  createResponse,
} from './common';

export const CsCategoryResponse = {
  saveCsCategory: {
    200: createMessageResponse({
      statusCode: 200,
      message: 'Save CsCategory Success',
    }),
    400: createErrorResponse({
      statusCode: 400,
      message: 'Already existed category name',
      error: 'BAD REQUEST',
    }),
  },
};
