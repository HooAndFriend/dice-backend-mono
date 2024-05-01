import { find } from 'rxjs';
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
    findSprint: {
        200: createResponse({
            data: {
              id: 1,
              name: '스프린트1',
              startDate: '2021-01-01',
              endDate: '2021-01-31',
              orderId: 1,
            },
            statusCode: 200,
            message: 'Sprint를 조회합니다.',
          }),
        },
    updateSprint: {
        200: createMessageResponse({
            statusCode: 200,
            message: 'Sprint를 수정합니다.',
        }),
        404: createErrorResponse({
            statusCode: 404,
            error: 'NOT FOUND',
            message: 'Sprint 정보를 찾을 수 없습니다.',
        }),
    },
};