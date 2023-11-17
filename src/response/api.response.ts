import { createErrorResponse, createMessageResponse } from "./common";

export const RequestApiResponse = {
    saveApi: {
        200: createMessageResponse({
          statusCode: 200,
          message: '새로운 request를 생성합니다.',
        }),
      },
      
    updateApi: {
    200: createMessageResponse({
        statusCode: 200,
        message: 'api를 수정합니다.',
    }),
    404: createErrorResponse({
        statusCode: 404,
        message: '해당 api를 찾을 수 없습니다.',
        error: 'NOT FOUND',
    }),
    },

    
}