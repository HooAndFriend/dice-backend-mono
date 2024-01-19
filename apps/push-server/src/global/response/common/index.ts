import type {
  ErrorResponse,
  MessageRespons,
  PaginationResponse,
  SuccessResponse,
} from '../../types/api';

export const createResponse = (data: SuccessResponse) => {
  return {
    status: data.statusCode,
    description: data.description ? data.description : data.message,
    schema: {
      properties: {
        statusCode: {
          type: 'number',
          example: data.statusCode,
        },
        message: {
          type: 'string',
          example: data.message,
        },
        data: {
          type: 'any',
          example: data.data,
        },
      },
    },
  };
};

export const createPaginationResponse = (data: PaginationResponse) => {
  return {
    status: data.statusCode,
    description: data.description ? data.description : data.message,
    schema: {
      properties: {
        statusCode: {
          type: 'number',
          example: data.statusCode,
        },
        message: {
          type: 'string',
          example: data.message,
        },
        data: {
          type: 'any',
          example: data.data,
        },
        count: {
          type: 'number',
          example: data.count,
        },
      },
    },
  };
};

export const createMessageResponse = (data: MessageRespons) => {
  return {
    status: data.statusCode,
    description: data.description ? data.description : data.message,
    schema: {
      properties: {
        statusCode: {
          type: 'number',
          example: data.statusCode,
        },
        message: {
          type: 'string',
          example: data.message,
        },
      },
    },
  };
};

export const createErrorResponse = (data: ErrorResponse) => {
  return {
    status: data.fakeCode ? data.fakeCode : data.statusCode,
    description: data.description ? data.description : data.message,
    schema: {
      properties: {
        statusCode: {
          type: 'number',
          example: data.statusCode,
        },
        message: {
          type: 'string',
          example: data.message,
        },
        error: {
          type: 'string',
          example: data.error,
        },
      },
    },
  };
};

export const createServerExceptionResponse = () => {
  return {
    status: 500,
    description: '서버에서 오류가 발생했습니다.',
    schema: {
      properties: {
        statusCode: {
          type: 'number',
          example: 500,
        },
        message: {
          type: 'string',
          example: 'Internal server error',
        },
      },
    },
  };
};

export const createUnauthorizedResponse = () => {
  return {
    status: 401,
    description: 'Token이 유효하지 않습니다.',
    schema: {
      properties: {
        statusCode: {
          type: 'number',
          example: 401,
        },
        message: {
          type: 'string',
          example: 'Unauthorized',
        },
      },
    },
  };
};
