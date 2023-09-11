import type {
  ErrorResponse,
  MessageRespons,
  SuccessResponse,
} from 'src/types/api';

export const createSuccessResponse = (data: SuccessResponse) => {
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
    description: 'Internal server error',
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
    description: 'Internal server error',
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
