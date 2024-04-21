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
  updateCsCategory: {
    200: createMessageResponse({
      statusCode: 200,
      message: 'Update CsCategory Success',
    }),
    400.1: createErrorResponse({
      statusCode: 400,
      message: 'Current name is same with new name',
      error: 'BAD REQUEST',
    }),
    400.2: createErrorResponse({
      statusCode: 400,
      message: 'Already existed category name',
      error: 'BAD REQUEST',
    }),
    404: createErrorResponse({
      statusCode: 404,
      message: 'Not Found CsCategory',
      error: 'NOT FOUND',
    }),
  },
};
