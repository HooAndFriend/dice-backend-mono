import {
    createErrorResponse,
    createMessageResponse,
    createResponse,
    createPaginationResponse,
  } from './common';
export const SprintResponse = {
    saveSprint: {
        200: createMessageResponse({
            statusCode: 200,
            message: 'Sprint를 생성합니다.',
        }),
    },
};